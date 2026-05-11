"""Backend API tests for Viknar'off Vinnytsia: /api/, /api/leads CRUD, /api/leads/{id}/status."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://site-audit-46.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_root_ok(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        assert "Viknar" in data.get("message", "")


# ---------- Leads CRUD ----------
class TestLeads:
    created_id = None

    def test_create_lead_minimal(self, client):
        payload = {"name": "TEST_Олена", "phone": "+380501112233"}
        r = client.post(f"{API}/leads", json=payload)
        assert r.status_code == 201, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["phone"] == payload["phone"]
        assert data["status"] == "new"
        assert isinstance(data["id"], str) and len(data["id"]) > 5
        TestLeads.created_id = data["id"]

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
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["status"] == "new"

    def test_create_lead_missing_name(self, client):
        r = client.post(f"{API}/leads", json={"phone": "+380501112233"})
        assert r.status_code == 422

    def test_create_lead_missing_phone(self, client):
        r = client.post(f"{API}/leads", json={"name": "TEST_NoPhone"})
        assert r.status_code == 422

    def test_create_lead_short_name(self, client):
        r = client.post(f"{API}/leads", json={"name": "A", "phone": "+380501112233"})
        assert r.status_code == 422

    def test_list_leads(self, client):
        r = client.get(f"{API}/leads")
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        assert len(items) >= 2
        # Verify our created lead is present
        ids = [i.get("id") for i in items]
        assert TestLeads.created_id in ids

    def test_list_leads_with_status_filter(self, client):
        r = client.get(f"{API}/leads", params={"status": "new"})
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        assert all(i["status"] == "new" for i in items)

    def test_get_lead_by_id(self, client):
        assert TestLeads.created_id, "Need created lead first"
        r = client.get(f"{API}/leads/{TestLeads.created_id}")
        assert r.status_code == 200
        data = r.json()
        assert data["id"] == TestLeads.created_id
        assert data["name"] == "TEST_Олена"

    def test_get_lead_404(self, client):
        r = client.get(f"{API}/leads/nonexistent-id-xyz-12345")
        assert r.status_code == 404

    def test_update_status_invalid(self, client):
        assert TestLeads.created_id
        r = client.patch(f"{API}/leads/{TestLeads.created_id}/status", params={"status": "bogus"})
        assert r.status_code == 400

    def test_update_status_contacted(self, client):
        assert TestLeads.created_id
        r = client.patch(f"{API}/leads/{TestLeads.created_id}/status", params={"status": "contacted"})
        assert r.status_code == 200
        assert r.json()["status"] == "contacted"
        # Verify persistence via GET
        g = client.get(f"{API}/leads/{TestLeads.created_id}")
        assert g.status_code == 200
        assert g.json()["status"] == "contacted"

    def test_update_status_404(self, client):
        r = client.patch(f"{API}/leads/missing-id-xyz/status", params={"status": "contacted"})
        assert r.status_code == 404


# ---------- Static assets via ingress ----------
class TestStaticAssets:
    """Ensure /viknaroff_photos/* returns real images, not the SPA index.html fallback."""

    @pytest.mark.parametrize("path", [
        "/viknaroff_photos/windows_for_house/windows_for_house_01.jpg",
        "/viknaroff_photos/windows_for_terrace/windows_for_terrace_01.jpg",
        "/viknaroff_photos/sliding_alu/sliding_alu_01.jpg",
        "/viknaroff_photos/doors_for_house/doors_for_house_01.jpg",
    ])
    def test_image_returns_200_and_image_content_type(self, client, path):
        r = client.get(f"{BASE_URL}{path}", allow_redirects=True)
        assert r.status_code == 200, f"{path} -> {r.status_code}"
        ct = r.headers.get("content-type", "")
        assert "image" in ct.lower(), f"{path} content-type={ct} (likely SPA fallback)"
