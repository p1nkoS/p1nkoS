from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Viknar'off Vinnytsia API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ================= MODELS =================

class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


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
    status: str = Field(default="new")  # new | contacted | converted | rejected
    created_at: datetime = Field(default_factory=datetime.utcnow)


class LeadResponse(BaseModel):
    id: str
    name: str
    phone: str
    status: str
    created_at: datetime
    message: str = "Заявку успішно прийнято! Ми передзвонимо протягом 15 хвилин."


# ================= ENDPOINTS =================

@api_router.get("/")
async def root():
    return {"message": "Viknar'off Vinnytsia API", "status": "ok"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    await db.status_checks.insert_one(status_obj.dict())
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]


@api_router.post("/leads", response_model=LeadResponse, status_code=201)
async def create_lead(payload: LeadCreate):
    """Create new lead/order request from website form."""
    try:
        lead = Lead(**payload.dict())
        # Persist to mongo
        doc = lead.dict()
        # Ensure datetime is JSON-serializable when retrieved later
        await db.leads.insert_one(doc)
        logger.info(f"New lead created: id={lead.id}, name={lead.name}, phone={lead.phone}")
        return LeadResponse(
            id=lead.id,
            name=lead.name,
            phone=lead.phone,
            status=lead.status,
            created_at=lead.created_at,
        )
    except Exception as e:
        logger.exception(f"Failed to create lead: {e}")
        raise HTTPException(status_code=500, detail="Не вдалося зберегти заявку. Спробуйте ще раз або зателефонуйте.")


@api_router.get("/leads", response_model=List[Lead])
async def list_leads(
    limit: int = Query(50, ge=1, le=500),
    status: Optional[str] = Query(None),
):
    """List leads (admin view). Filter by status optionally."""
    q = {}
    if status:
        q["status"] = status
    cursor = db.leads.find(q).sort("created_at", -1).limit(limit)
    items = await cursor.to_list(length=limit)
    return [Lead(**i) for i in items]


@api_router.get("/leads/{lead_id}", response_model=Lead)
async def get_lead(lead_id: str):
    item = await db.leads.find_one({"id": lead_id})
    if not item:
        raise HTTPException(status_code=404, detail="Lead not found")
    return Lead(**item)


@api_router.patch("/leads/{lead_id}/status")
async def update_lead_status(lead_id: str, status: str = Query(...)):
    if status not in {"new", "contacted", "converted", "rejected"}:
        raise HTTPException(status_code=400, detail="Invalid status")
    res = await db.leads.update_one({"id": lead_id}, {"$set": {"status": status}})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"id": lead_id, "status": status}


# Include router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
