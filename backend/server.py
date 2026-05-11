from fastapi import FastAPI, APIRouter, HTTPException, Query, Request, Response, Depends
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import io
import csv
import uuid
import asyncio
import logging
import httpx
import resend
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, timezone, timedelta

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

# --- Mongo ---
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

# --- Config ---
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
LEAD_NOTIFY_EMAIL = os.environ.get("LEAD_NOTIFY_EMAIL", "")
ADMIN_ALLOWED_EMAILS = {
    e.strip().lower()
    for e in os.environ.get("ADMIN_ALLOWED_EMAILS", "").split(",")
    if e.strip()
}
EMERGENT_AUTH_URL = "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data"
SESSION_TTL_DAYS = 7

# CORS origins: comma-separated env, plus always-allowed preview/localhost regex below
_cors_env = os.environ.get("CORS_ORIGINS", "").strip()
if _cors_env == "*" or _cors_env == "":
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8001"]
else:
    CORS_ORIGINS = [o.strip() for o in _cors_env.split(",") if o.strip()]

# Rate limit on POST /api/leads (per IP, per window)
RATE_LIMIT_MAX = int(os.environ.get("LEADS_RATE_LIMIT_MAX", "5"))
RATE_LIMIT_WINDOW_SEC = int(os.environ.get("LEADS_RATE_LIMIT_WINDOW_SEC", "60"))
_rate_buckets: dict = {}  # ip -> list[float timestamps]
_rate_lock = asyncio.Lock()

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

app = FastAPI(title="Viknar'off Vinnytsia API")
api_router = APIRouter(prefix="/api")


# ============================================================
# MODELS
# ============================================================
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class LeadCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=80)
    phone: str = Field(..., min_length=5, max_length=30)
    city: Optional[str] = Field(None, max_length=80)
    service: Optional[str] = Field(None, max_length=80)
    product_slug: Optional[str] = Field(None, max_length=80)
    product_name: Optional[str] = Field(None, max_length=160)
    message: Optional[str] = Field(None, max_length=1500)
    source: Optional[str] = Field(default="website", max_length=40)


class Lead(LeadCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = Field(default="new")
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class LeadResponse(BaseModel):
    id: str
    name: str
    phone: str
    status: str
    created_at: datetime
    message: str = "Заявку успішно прийнято! Ми передзвонимо протягом 15 хвилин."


class User(BaseModel):
    user_id: str
    email: str
    name: str
    picture: Optional[str] = ""


# ============================================================
# EMAIL (Resend, async via to_thread)
# ============================================================
def _build_lead_email_html(lead: Lead) -> str:
    rows = [
        ("Імʼя", lead.name),
        ("Телефон", lead.phone),
        ("Місто", lead.city or "—"),
        ("Послуга", lead.service or "—"),
        ("Продукт", lead.product_name or lead.product_slug or "—"),
        ("Повідомлення", lead.message or "—"),
        ("Джерело", lead.source or "website"),
        ("Дата", lead.created_at.strftime("%Y-%m-%d %H:%M UTC")),
    ]
    tr = "".join(
        f'<tr><td style="padding:8px 12px;background:#f5f1ec;font-weight:600;width:160px;border-bottom:1px solid #e6dfd5;">{k}</td>'
        f'<td style="padding:8px 12px;border-bottom:1px solid #e6dfd5;">{v}</td></tr>'
        for k, v in rows
    )
    return f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#FF5722;margin:0 0 16px 0;">Нова заявка з сайту Viknar'off</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e6dfd5;border-radius:8px;overflow:hidden;">
        {tr}
      </table>
      <p style="color:#888;font-size:12px;margin-top:16px;">ID заявки: {lead.id}</p>
    </div>
    """


async def send_lead_notification(lead: Lead) -> None:
    if not RESEND_API_KEY or not LEAD_NOTIFY_EMAIL:
        logger.warning("Resend not configured — skipping email")
        return
    params = {
        "from": SENDER_EMAIL,
        "to": [LEAD_NOTIFY_EMAIL],
        "subject": f"🪟 Нова заявка: {lead.name} ({lead.phone})",
        "html": _build_lead_email_html(lead),
    }
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email sent for lead {lead.id}: {result.get('id') if isinstance(result, dict) else result}")
    except Exception as e:
        logger.exception(f"Failed to send lead notification email: {e}")


# ============================================================
# AUTH
# ============================================================
async def get_session_token(request: Request) -> Optional[str]:
    token = request.cookies.get("session_token")
    if token:
        return token
    auth = request.headers.get("Authorization", "")
    if auth.startswith("Bearer "):
        return auth.split(" ", 1)[1].strip()
    return None


async def get_current_user(request: Request) -> User:
    token = await get_session_token(request)
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    session = await db.user_sessions.find_one({"session_token": token}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=401, detail="Invalid session")
    expires_at = session.get("expires_at")
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Session expired")
    user_doc = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
    if not user_doc:
        raise HTTPException(status_code=401, detail="User not found")
    return User(**user_doc)


async def require_admin(user: User = Depends(get_current_user)) -> User:
    if user.email.lower() not in ADMIN_ALLOWED_EMAILS:
        raise HTTPException(status_code=403, detail="Access denied")
    return user


@api_router.post("/auth/session")
async def create_session(request: Request, response: Response):
    """Exchange session_id from Emergent Auth → set session_token cookie."""
    body = await request.json()
    session_id = body.get("session_id")
    if not session_id:
        raise HTTPException(status_code=400, detail="session_id required")

    async with httpx.AsyncClient(timeout=10) as http:
        r = await http.get(EMERGENT_AUTH_URL, headers={"X-Session-ID": session_id})
    if r.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid session_id")
    data = r.json()
    email = data["email"]
    name = data.get("name", "")
    picture = data.get("picture", "")
    session_token = data["session_token"]

    # Upsert user
    existing = await db.users.find_one({"email": email}, {"_id": 0})
    if existing:
        user_id = existing["user_id"]
        await db.users.update_one(
            {"user_id": user_id},
            {"$set": {"name": name, "picture": picture}},
        )
    else:
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        await db.users.insert_one({
            "user_id": user_id,
            "email": email,
            "name": name,
            "picture": picture,
            "created_at": datetime.now(timezone.utc),
        })

    expires_at = datetime.now(timezone.utc) + timedelta(days=SESSION_TTL_DAYS)
    # Cleanup: remove any expired sessions for this user + any prior session with same token
    await db.user_sessions.delete_many({
        "$or": [
            {"user_id": user_id, "expires_at": {"$lt": datetime.now(timezone.utc)}},
            {"session_token": session_token},
        ]
    })
    await db.user_sessions.insert_one({
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": expires_at,
        "created_at": datetime.now(timezone.utc),
    })

    response.set_cookie(
        key="session_token",
        value=session_token,
        httponly=True,
        secure=True,
        samesite="none",
        path="/",
        max_age=SESSION_TTL_DAYS * 24 * 3600,
    )
    is_admin = email.lower() in ADMIN_ALLOWED_EMAILS
    return {
        "user_id": user_id,
        "email": email,
        "name": name,
        "picture": picture,
        "is_admin": is_admin,
        "session_token": session_token,
    }


@api_router.get("/auth/me")
async def auth_me(user: User = Depends(get_current_user)):
    return {
        "user_id": user.user_id,
        "email": user.email,
        "name": user.name,
        "picture": user.picture,
        "is_admin": user.email.lower() in ADMIN_ALLOWED_EMAILS,
    }


@api_router.post("/auth/logout")
async def auth_logout(request: Request, response: Response):
    token = await get_session_token(request)
    if token:
        await db.user_sessions.delete_one({"session_token": token})
    response.delete_cookie("session_token", path="/", samesite="none", secure=True)
    return {"ok": True}


# ============================================================
# PUBLIC ROUTES
# ============================================================
@api_router.get("/")
async def root():
    return {"message": "Viknar'off Vinnytsia API", "status": "ok"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.dict())
    await db.status_checks.insert_one(status_obj.dict())
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    items = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    return [StatusCheck(**i) for i in items]


@api_router.post("/leads", response_model=LeadResponse, status_code=201)
async def create_lead(payload: LeadCreate, request: Request):
    # Rate limit per IP (simple in-memory token bucket)
    ip = request.headers.get("x-forwarded-for", "").split(",")[0].strip() or (request.client.host if request.client else "unknown")
    now = datetime.now(timezone.utc).timestamp()
    async with _rate_lock:
        bucket = [t for t in _rate_buckets.get(ip, []) if now - t < RATE_LIMIT_WINDOW_SEC]
        if len(bucket) >= RATE_LIMIT_MAX:
            _rate_buckets[ip] = bucket
            raise HTTPException(
                status_code=429,
                detail=f"Забагато заявок з вашого IP. Спробуйте за {RATE_LIMIT_WINDOW_SEC} секунд.",
            )
        bucket.append(now)
        _rate_buckets[ip] = bucket

    lead = Lead(**payload.dict())
    await db.leads.insert_one(lead.dict())
    logger.info(f"Lead created: {lead.id} {lead.name} {lead.phone} (ip={ip})")
    # Fire-and-forget email
    asyncio.create_task(send_lead_notification(lead))
    return LeadResponse(
        id=lead.id, name=lead.name, phone=lead.phone,
        status=lead.status, created_at=lead.created_at,
    )


# ============================================================
# ADMIN ROUTES (protected)
# ============================================================
@api_router.get("/admin/leads")
async def admin_list_leads(
    _: User = Depends(require_admin),
    limit: int = Query(200, ge=1, le=1000),
    skip: int = Query(0, ge=0),
    status: Optional[str] = Query(None),
    q: Optional[str] = Query(None, description="Search in name/phone/city/product"),
    date_from: Optional[str] = Query(None, description="ISO date YYYY-MM-DD"),
    date_to: Optional[str] = Query(None, description="ISO date YYYY-MM-DD"),
):
    query: dict = {}
    if status and status != "all":
        query["status"] = status
    if q:
        rx = {"$regex": q, "$options": "i"}
        query["$or"] = [
            {"name": rx}, {"phone": rx}, {"city": rx},
            {"product_name": rx}, {"product_slug": rx}, {"message": rx},
        ]
    if date_from or date_to:
        rng: dict = {}
        try:
            if date_from:
                rng["$gte"] = datetime.fromisoformat(date_from).replace(tzinfo=timezone.utc)
            if date_to:
                rng["$lte"] = (datetime.fromisoformat(date_to) + timedelta(days=1)).replace(tzinfo=timezone.utc)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid date format, expected YYYY-MM-DD")
        query["created_at"] = rng

    total = await db.leads.count_documents(query)
    cursor = db.leads.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit)
    items = await cursor.to_list(length=limit)
    return {"total": total, "items": items}


@api_router.patch("/admin/leads/{lead_id}/status")
async def admin_update_status(lead_id: str, status: str = Query(...), _: User = Depends(require_admin)):
    if status not in {"new", "contacted", "converted", "rejected"}:
        raise HTTPException(status_code=400, detail="Invalid status")
    res = await db.leads.update_one({"id": lead_id}, {"$set": {"status": status}})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"id": lead_id, "status": status}


@api_router.delete("/admin/leads/{lead_id}")
async def admin_delete_lead(lead_id: str, _: User = Depends(require_admin)):
    res = await db.leads.delete_one({"id": lead_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"ok": True}


@api_router.get("/admin/leads/export.csv")
async def admin_export_csv(_: User = Depends(require_admin)):
    cursor = db.leads.find({}, {"_id": 0}).sort("created_at", -1)
    leads = await cursor.to_list(length=10000)

    def gen():
        buf = io.StringIO()
        w = csv.writer(buf)
        w.writerow(["ID", "Дата", "Імʼя", "Телефон", "Місто", "Послуга",
                    "Продукт", "Повідомлення", "Статус", "Джерело"])
        yield buf.getvalue()
        buf.seek(0); buf.truncate()
        for l in leads:
            dt = l.get("created_at")
            if isinstance(dt, datetime):
                dt = dt.strftime("%Y-%m-%d %H:%M")
            w.writerow([
                l.get("id", ""), dt or "",
                l.get("name", ""), l.get("phone", ""),
                l.get("city", "") or "", l.get("service", "") or "",
                l.get("product_name", "") or l.get("product_slug", "") or "",
                (l.get("message", "") or "").replace("\n", " "),
                l.get("status", ""), l.get("source", "") or "",
            ])
            yield buf.getvalue()
            buf.seek(0); buf.truncate()

    return StreamingResponse(
        gen(),
        media_type="text/csv; charset=utf-8",
        headers={"Content-Disposition": 'attachment; filename="leads.csv"'},
    )


@api_router.get("/admin/stats")
async def admin_stats(_: User = Depends(require_admin)):
    pipeline = [{"$group": {"_id": "$status", "count": {"$sum": 1}}}]
    rows = await db.leads.aggregate(pipeline).to_list(50)
    by_status = {r["_id"]: r["count"] for r in rows}
    total = sum(by_status.values())
    return {
        "total": total,
        "new": by_status.get("new", 0),
        "contacted": by_status.get("contacted", 0),
        "converted": by_status.get("converted", 0),
        "rejected": by_status.get("rejected", 0),
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=CORS_ORIGINS,
    allow_origin_regex=r"https://.*\.preview\.emergentagent\.com",
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
