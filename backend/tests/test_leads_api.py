"""Backend API tests for Viknar'off lead and status endpoints."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://photos-19.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_root(self, session):
        r = session.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"


# ---------- Leads CRUD ----------
class TestLeads:
    created_id = None

    def test_create_lead(self, session):
        payload = {
            "name": "TEST_Іван",
            "phone": "(068) 723-97-22",
            "city": "Вінниця",
            "service": "windows",
            "product_slug": "gealan-s9000",
            "product_name": "Gealan S 9000",
            "message": "TEST automated lead",
            "source": "pytest",
        }
        r = session.post(f"{API}/leads", json=payload, timeout=15)
        assert r.status_code == 201, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["phone"] == payload["phone"]
        assert data["status"] == "new"
        assert isinstance(data["id"], str) and len(data["id"]) > 5
        TestLeads.created_id = data["id"]

    def test_get_lead_by_id(self, session):
        assert TestLeads.created_id, "create_lead must run first"
        r = session.get(f"{API}/leads/{TestLeads.created_id}", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data["id"] == TestLeads.created_id
        assert data["name"] == "TEST_Іван"
        assert data["product_slug"] == "gealan-s9000"

    def test_list_leads_contains_created(self, session):
        r = session.get(f"{API}/leads?limit=100", timeout=15)
        assert r.status_code == 200
        ids = [x["id"] for x in r.json()]
        assert TestLeads.created_id in ids

    def test_update_lead_status_valid(self, session):
        r = session.patch(
            f"{API}/leads/{TestLeads.created_id}/status",
            params={"status": "contacted"},
            timeout=15,
        )
        assert r.status_code == 200
        # verify persisted
        g = session.get(f"{API}/leads/{TestLeads.created_id}", timeout=15)
        assert g.json()["status"] == "contacted"

    def test_update_lead_status_invalid(self, session):
        r = session.patch(
            f"{API}/leads/{TestLeads.created_id}/status",
            params={"status": "garbage"},
            timeout=15,
        )
        assert r.status_code == 400

    def test_get_missing_lead(self, session):
        r = session.get(f"{API}/leads/nonexistent-id-xyz", timeout=15)
        assert r.status_code == 404

    def test_create_lead_validation_short_name(self, session):
        r = session.post(
            f"{API}/leads",
            json={"name": "A", "phone": "0687239722"},
            timeout=15,
        )
        assert r.status_code == 422

    def test_create_minimal_lead(self, session):
        r = session.post(
            f"{API}/leads",
            json={"name": "TEST_Minimal", "phone": "+380687239722"},
            timeout=15,
        )
        assert r.status_code == 201
        data = r.json()
        assert data["status"] == "new"
        assert "id" in data
