"""
Backend API tests for Viknar'off Vinnytsia.

Covers:
- Health: GET /api/
- Public leads: POST /api/leads (success + validation)
- Auth: GET /api/auth/me (with/without token), POST /api/auth/logout
- Admin leads list: GET /api/admin/leads (auth gating, filters, pagination)
- Admin stats:   GET /api/admin/stats
- Admin status update: PATCH /api/admin/leads/{id}/status
- Admin delete:  DELETE /api/admin/leads/{id}
- Admin CSV export: GET /api/admin/leads/export.csv
"""
import os
import csv
import io
import pytest
import requests
from datetime import datetime, timezone

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/") if os.environ.get("REACT_APP_BACKEND_URL") else "https://backend-finalize.preview.emergentagent.com"
API = f"{BASE_URL}/api"

ADMIN_TOKEN = "test_session_admin_001"
NONADMIN_TOKEN = "test_session_nonadmin_001"

ADMIN_HEADERS = {"Authorization": f"Bearer {ADMIN_TOKEN}"}
NONADMIN_HEADERS = {"Authorization": f"Bearer {NONADMIN_TOKEN}"}


# ---------- Fixtures ----------
@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def created_lead_id(client):
    """Create a lead and return its id, for admin tests."""
    payload = {
        "name": "TEST_FixtureLead",
        "phone": "+380501112299",
        "city": "Вінниця",
        "service": "Замір",
        "product_slug": "gealan-s-9000",
        "product_name": "Gealan S 9000",
        "message": "fixture lead",
        "source": "website",
    }
    r = client.post(f"{API}/leads", json=payload)
    assert r.status_code == 201, r.text
    return r.json()["id"]


# ============================================================
# Health
# ============================================================
class TestHealth:
    def test_root_ok(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        assert "Viknar" in data.get("message", "")


# ============================================================
# Public leads
# ============================================================
class TestLeadsPublic:
    def test_create_lead_minimal(self, client):
        payload = {"name": "TEST_Олена", "phone": "+380501112233"}
        r = client.post(f"{API}/leads", json=payload)
        assert r.status_code == 201, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["phone"] == payload["phone"]
        assert data["status"] == "new"
        assert isinstance(data["id"], str) and len(data["id"]) > 5
        assert "Заявку успішно прийнято" in data.get("message", "")

    def test_create_lead_full(self, client):
        payload = {
            "name": "TEST_Андрій",
            "phone": "0687239722",
            "city": "Вінниця",
            "service": "Замір",
            "product_slug": "gealan-s-9000",
            "product_name": "Gealan S 9000",
            "message": "Хочу замовити вікна для котеджу",
            "source": "website",
        }
        r = client.post(f"{API}/leads", json=payload)
        assert r.status_code == 201, r.text
        assert r.json()["status"] == "new"

    def test_create_lead_missing_name(self, client):
        r = client.post(f"{API}/leads", json={"phone": "+380501112233"})
        assert r.status_code == 422

    def test_create_lead_missing_phone(self, client):
        r = client.post(f"{API}/leads", json={"name": "TEST_NoPhone"})
        assert r.status_code == 422

    def test_create_lead_short_name(self, client):
        r = client.post(f"{API}/leads", json={"name": "A", "phone": "+380501112233"})
        assert r.status_code == 422

    def test_create_lead_short_phone(self, client):
        r = client.post(f"{API}/leads", json={"name": "TEST_X", "phone": "123"})
        assert r.status_code == 422


# ============================================================
# Auth
# ============================================================
class TestAuth:
    def test_me_without_token_401(self, client):
        r = requests.get(f"{API}/auth/me")
        assert r.status_code == 401

    def test_me_with_admin_token(self):
        r = requests.get(f"{API}/auth/me", headers=ADMIN_HEADERS)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["email"] == "viknaroffvin@gmail.com"
        assert data["is_admin"] is True

    def test_me_with_nonadmin_token(self):
        r = requests.get(f"{API}/auth/me", headers=NONADMIN_HEADERS)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["email"] == "nonadmin@test.com"
        assert data["is_admin"] is False

    def test_me_with_invalid_token(self):
        r = requests.get(f"{API}/auth/me", headers={"Authorization": "Bearer invalid_xxx"})
        assert r.status_code == 401

    def test_logout_clears_session(self):
        # Seed a throwaway session to delete
        import pymongo
        m = pymongo.MongoClient("mongodb://localhost:27017")
        db = m["test_database"]
        db.users.update_one(
            {"user_id": "test-user-logout"},
            {"$set": {"user_id": "test-user-logout", "email": "logout@test.com", "name": "LO", "picture": ""}},
            upsert=True,
        )
        from datetime import timedelta
        db.user_sessions.delete_many({"session_token": "test_session_logout_001"})
        db.user_sessions.insert_one({
            "user_id": "test-user-logout",
            "session_token": "test_session_logout_001",
            "expires_at": datetime.now(timezone.utc) + timedelta(days=1),
            "created_at": datetime.now(timezone.utc),
        })
        # Verify works
        r = requests.get(f"{API}/auth/me", headers={"Authorization": "Bearer test_session_logout_001"})
        assert r.status_code == 200
        # Logout
        r2 = requests.post(f"{API}/auth/logout", headers={"Authorization": "Bearer test_session_logout_001"})
        assert r2.status_code == 200
        assert r2.json().get("ok") is True
        # Now invalid
        r3 = requests.get(f"{API}/auth/me", headers={"Authorization": "Bearer test_session_logout_001"})
        assert r3.status_code == 401


# ============================================================
# Admin leads list (gating, filters, pagination)
# ============================================================
class TestAdminLeadsList:
    def test_list_without_auth_401(self):
        r = requests.get(f"{API}/admin/leads")
        assert r.status_code == 401

    def test_list_nonadmin_403(self):
        r = requests.get(f"{API}/admin/leads", headers=NONADMIN_HEADERS)
        assert r.status_code == 403

    def test_list_admin_ok(self, created_lead_id):
        r = requests.get(f"{API}/admin/leads", headers=ADMIN_HEADERS)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "total" in data and "items" in data
        assert isinstance(data["items"], list)
        ids = [i["id"] for i in data["items"]]
        assert created_lead_id in ids
        # Ensure no Mongo _id leaks
        for it in data["items"]:
            assert "_id" not in it

    def test_list_with_q_filter(self, created_lead_id):
        r = requests.get(f"{API}/admin/leads", headers=ADMIN_HEADERS, params={"q": "FixtureLead"})
        assert r.status_code == 200
        items = r.json()["items"]
        assert any(i["id"] == created_lead_id for i in items)
        assert all("FixtureLead" in (i.get("name") or "") or "FixtureLead" in (i.get("message") or "") for i in items)

    def test_list_with_status_filter(self, client):
        r = requests.get(f"{API}/admin/leads", headers=ADMIN_HEADERS, params={"status": "new"})
        assert r.status_code == 200
        items = r.json()["items"]
        assert all(i["status"] == "new" for i in items)

    def test_list_with_date_filter_today_inclusive(self):
        today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        r = requests.get(
            f"{API}/admin/leads",
            headers=ADMIN_HEADERS,
            params={"date_from": today, "date_to": today},
        )
        assert r.status_code == 200
        # Should include today's created leads
        assert r.json()["total"] >= 1

    def test_list_pagination(self):
        r1 = requests.get(f"{API}/admin/leads", headers=ADMIN_HEADERS, params={"limit": 1, "skip": 0})
        assert r1.status_code == 200
        d1 = r1.json()
        assert len(d1["items"]) <= 1
        r2 = requests.get(f"{API}/admin/leads", headers=ADMIN_HEADERS, params={"limit": 1, "skip": 1})
        assert r2.status_code == 200
        d2 = r2.json()
        if d1["total"] >= 2:
            assert d1["items"][0]["id"] != d2["items"][0]["id"]


# ============================================================
# Admin stats
# ============================================================
class TestAdminStats:
    def test_stats_no_auth_401(self):
        r = requests.get(f"{API}/admin/stats")
        assert r.status_code == 401

    def test_stats_nonadmin_403(self):
        r = requests.get(f"{API}/admin/stats", headers=NONADMIN_HEADERS)
        assert r.status_code == 403

    def test_stats_admin_ok(self, created_lead_id):
        r = requests.get(f"{API}/admin/stats", headers=ADMIN_HEADERS)
        assert r.status_code == 200, r.text
        data = r.json()
        for k in ("total", "new", "contacted", "converted", "rejected"):
            assert k in data
            assert isinstance(data[k], int)
        # Total equals sum of buckets
        assert data["total"] == data["new"] + data["contacted"] + data["converted"] + data["rejected"]
        assert data["total"] >= 1


# ============================================================
# Admin status update + delete
# ============================================================
class TestAdminMutations:
    def test_patch_no_auth_401(self, created_lead_id):
        r = requests.patch(f"{API}/admin/leads/{created_lead_id}/status", params={"status": "contacted"})
        assert r.status_code == 401

    def test_patch_invalid_status_400(self, created_lead_id):
        r = requests.patch(
            f"{API}/admin/leads/{created_lead_id}/status",
            params={"status": "bogus"},
            headers=ADMIN_HEADERS,
        )
        assert r.status_code == 400

    def test_patch_status_contacted_persists(self, created_lead_id):
        r = requests.patch(
            f"{API}/admin/leads/{created_lead_id}/status",
            params={"status": "contacted"},
            headers=ADMIN_HEADERS,
        )
        assert r.status_code == 200, r.text
        assert r.json()["status"] == "contacted"
        # Verify via list
        g = requests.get(f"{API}/admin/leads", headers=ADMIN_HEADERS, params={"q": "FixtureLead"})
        item = next((i for i in g.json()["items"] if i["id"] == created_lead_id), None)
        assert item is not None and item["status"] == "contacted"

    def test_patch_status_404(self):
        r = requests.patch(
            f"{API}/admin/leads/nonexistent-xyz/status",
            params={"status": "contacted"},
            headers=ADMIN_HEADERS,
        )
        assert r.status_code == 404

    def test_delete_no_auth_401(self):
        r = requests.delete(f"{API}/admin/leads/whatever")
        assert r.status_code == 401

    def test_delete_404(self):
        r = requests.delete(f"{API}/admin/leads/nonexistent-xyz", headers=ADMIN_HEADERS)
        assert r.status_code == 404

    def test_delete_lead(self, client):
        # Create a throwaway lead, delete it, verify
        cr = client.post(f"{API}/leads", json={"name": "TEST_ToDelete", "phone": "+380501110000"})
        assert cr.status_code == 201
        lid = cr.json()["id"]
        dr = requests.delete(f"{API}/admin/leads/{lid}", headers=ADMIN_HEADERS)
        assert dr.status_code == 200
        assert dr.json().get("ok") is True
        # Verify not in list
        lst = requests.get(f"{API}/admin/leads", headers=ADMIN_HEADERS, params={"q": "TEST_ToDelete"}).json()
        assert all(i["id"] != lid for i in lst["items"])


# ============================================================
# CSV export
# ============================================================
class TestCsvExport:
    def test_csv_no_auth_401(self):
        r = requests.get(f"{API}/admin/leads/export.csv")
        assert r.status_code == 401

    def test_csv_nonadmin_403(self):
        r = requests.get(f"{API}/admin/leads/export.csv", headers=NONADMIN_HEADERS)
        assert r.status_code == 403

    def test_csv_admin_ok(self, created_lead_id):
        r = requests.get(f"{API}/admin/leads/export.csv", headers=ADMIN_HEADERS)
        assert r.status_code == 200, r.text
        ct = r.headers.get("content-type", "")
        assert "text/csv" in ct.lower()
        assert "charset=utf-8" in ct.lower()
        text = r.content.decode("utf-8")
        # Ukrainian headers present
        assert "Імʼя" in text
        assert "Телефон" in text
        assert "Статус" in text
        # Parse CSV; ensure our fixture lead appears
        reader = csv.reader(io.StringIO(text))
        rows = list(reader)
        assert len(rows) >= 2  # header + ≥1 data
        ids = [row[0] for row in rows[1:]]
        assert created_lead_id in ids


# ============================================================
# Cleanup hook
# ============================================================
@pytest.fixture(scope="session", autouse=True)
def cleanup_test_data():
    yield
    try:
        import pymongo
        m = pymongo.MongoClient("mongodb://localhost:27017")
        db = m["test_database"]
        db.leads.delete_many({"name": {"$regex": "^TEST_"}})
    except Exception:
        pass
