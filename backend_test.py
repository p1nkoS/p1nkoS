#!/usr/bin/env python3
"""
Backend API Test Suite for Viknar'off Vinnytsia
Tests all /api endpoints using the production URL from frontend/.env
"""

import requests
import json
import uuid
from datetime import datetime
from typing import Dict, Any, Optional

# Read backend URL from frontend/.env
BACKEND_URL = "https://photos-19.preview.emergentagent.com"
API_BASE = f"{BACKEND_URL}/api"

# Test results tracking
test_results = {
    "passed": [],
    "failed": [],
    "total": 0
}

def log_test(test_name: str, passed: bool, details: str = ""):
    """Log test result"""
    test_results["total"] += 1
    status = "✅ PASS" if passed else "❌ FAIL"
    result = f"{status} | {test_name}"
    if details:
        result += f"\n    Details: {details}"
    
    if passed:
        test_results["passed"].append(test_name)
        print(result)
    else:
        test_results["failed"].append(test_name)
        print(result)
    print()

def test_1_health_check():
    """Test 1: GET /api/ - Health check endpoint"""
    print("=" * 80)
    print("TEST 1: GET /api/ - Health check")
    print("=" * 80)
    
    try:
        response = requests.get(f"{API_BASE}/", timeout=10)
        
        if response.status_code != 200:
            log_test("Health check status code", False, f"Expected 200, got {response.status_code}")
            return
        
        data = response.json()
        expected = {"message": "Viknar'off Vinnytsia API", "status": "ok"}
        
        if data == expected:
            log_test("Health check response", True, f"Response: {data}")
        else:
            log_test("Health check response", False, f"Expected {expected}, got {data}")
    
    except Exception as e:
        log_test("Health check", False, f"Exception: {str(e)}")

def test_2_create_lead_full():
    """Test 2: POST /api/leads - Create lead with full payload"""
    print("=" * 80)
    print("TEST 2: POST /api/leads - Create lead with full payload")
    print("=" * 80)
    
    payload = {
        "name": "Тест Тестенко",
        "phone": "+380681234567",
        "city": "Вінниця",
        "service": "Замір",
        "message": "Тестова заявка",
        "source": "backend-test"
    }
    
    try:
        response = requests.post(f"{API_BASE}/leads", json=payload, timeout=10)
        
        if response.status_code != 201:
            log_test("Create lead status code", False, f"Expected 201, got {response.status_code}. Response: {response.text}")
            return None
        
        data = response.json()
        
        # Check required fields
        required_fields = ["id", "name", "phone", "status", "created_at", "message"]
        missing_fields = [f for f in required_fields if f not in data]
        
        if missing_fields:
            log_test("Create lead response fields", False, f"Missing fields: {missing_fields}")
            return None
        
        # Verify data
        if data["name"] == payload["name"] and data["phone"] == payload["phone"]:
            log_test("Create lead with full payload", True, f"Lead created with ID: {data['id']}")
            return data["id"]
        else:
            log_test("Create lead data verification", False, f"Data mismatch: {data}")
            return None
    
    except Exception as e:
        log_test("Create lead with full payload", False, f"Exception: {str(e)}")
        return None

def test_3_create_lead_validation():
    """Test 3: POST /api/leads - Validation with invalid payload"""
    print("=" * 80)
    print("TEST 3: POST /api/leads - Validation test")
    print("=" * 80)
    
    invalid_payload = {
        "name": "",
        "phone": ""
    }
    
    try:
        response = requests.post(f"{API_BASE}/leads", json=invalid_payload, timeout=10)
        
        if response.status_code == 422:
            log_test("Lead validation (422 for invalid data)", True, f"Correctly returned 422 validation error")
        else:
            log_test("Lead validation", False, f"Expected 422, got {response.status_code}. Response: {response.text}")
    
    except Exception as e:
        log_test("Lead validation test", False, f"Exception: {str(e)}")

def test_4_create_lead_with_product():
    """Test 4: POST /api/leads - Create lead with product info"""
    print("=" * 80)
    print("TEST 4: POST /api/leads - Create lead with product info")
    print("=" * 80)
    
    payload = {
        "name": "Іван",
        "phone": "+380501112233",
        "product_slug": "gealan-s9000",
        "product_name": "Gealan S 9000",
        "source": "product-page"
    }
    
    try:
        response = requests.post(f"{API_BASE}/leads", json=payload, timeout=10)
        
        if response.status_code == 201:
            data = response.json()
            log_test("Create lead with product info", True, f"Lead created with ID: {data['id']}")
            return data["id"]
        else:
            log_test("Create lead with product info", False, f"Expected 201, got {response.status_code}. Response: {response.text}")
            return None
    
    except Exception as e:
        log_test("Create lead with product info", False, f"Exception: {str(e)}")
        return None

def test_5_list_leads():
    """Test 5: GET /api/leads - List all leads"""
    print("=" * 80)
    print("TEST 5: GET /api/leads - List all leads")
    print("=" * 80)
    
    try:
        response = requests.get(f"{API_BASE}/leads", timeout=10)
        
        if response.status_code != 200:
            log_test("List leads status code", False, f"Expected 200, got {response.status_code}")
            return []
        
        data = response.json()
        
        if not isinstance(data, list):
            log_test("List leads response type", False, f"Expected list, got {type(data)}")
            return []
        
        if len(data) > 0:
            log_test("List leads", True, f"Retrieved {len(data)} leads. First lead ID: {data[0].get('id', 'N/A')}")
            return data
        else:
            log_test("List leads", True, f"Retrieved 0 leads (empty database)")
            return []
    
    except Exception as e:
        log_test("List leads", False, f"Exception: {str(e)}")
        return []

def test_6_list_leads_with_limit():
    """Test 6: GET /api/leads?limit=2 - Pagination test"""
    print("=" * 80)
    print("TEST 6: GET /api/leads?limit=2 - Pagination test")
    print("=" * 80)
    
    try:
        response = requests.get(f"{API_BASE}/leads?limit=2", timeout=10)
        
        if response.status_code != 200:
            log_test("List leads with limit status", False, f"Expected 200, got {response.status_code}")
            return
        
        data = response.json()
        
        if len(data) <= 2:
            log_test("List leads with limit=2", True, f"Retrieved {len(data)} leads (≤2 as expected)")
        else:
            log_test("List leads with limit=2", False, f"Expected ≤2 leads, got {len(data)}")
    
    except Exception as e:
        log_test("List leads with limit", False, f"Exception: {str(e)}")

def test_7_list_leads_by_status():
    """Test 7: GET /api/leads?status=new - Filter by status"""
    print("=" * 80)
    print("TEST 7: GET /api/leads?status=new - Filter by status")
    print("=" * 80)
    
    try:
        response = requests.get(f"{API_BASE}/leads?status=new", timeout=10)
        
        if response.status_code != 200:
            log_test("List leads by status", False, f"Expected 200, got {response.status_code}")
            return
        
        data = response.json()
        
        # Check all leads have status="new"
        non_new_leads = [lead for lead in data if lead.get("status") != "new"]
        
        if len(non_new_leads) == 0:
            log_test("List leads by status=new", True, f"All {len(data)} leads have status='new'")
        else:
            log_test("List leads by status=new", False, f"Found {len(non_new_leads)} leads with status != 'new'")
    
    except Exception as e:
        log_test("List leads by status", False, f"Exception: {str(e)}")

def test_8_get_single_lead(lead_id: Optional[str] = None):
    """Test 8: GET /api/leads/{lead_id} - Get single lead + 404 test"""
    print("=" * 80)
    print("TEST 8: GET /api/leads/{lead_id} - Get single lead")
    print("=" * 80)
    
    # If no lead_id provided, create one
    if not lead_id:
        print("No lead_id provided, creating a new lead first...")
        lead_id = test_2_create_lead_full()
        if not lead_id:
            log_test("Get single lead (no ID available)", False, "Could not create lead for testing")
            return
    
    # Test valid lead_id
    try:
        response = requests.get(f"{API_BASE}/leads/{lead_id}", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("id") == lead_id:
                log_test("Get single lead by ID", True, f"Retrieved lead: {data.get('name')}")
            else:
                log_test("Get single lead by ID", False, f"ID mismatch: expected {lead_id}, got {data.get('id')}")
        else:
            log_test("Get single lead by ID", False, f"Expected 200, got {response.status_code}")
    
    except Exception as e:
        log_test("Get single lead by ID", False, f"Exception: {str(e)}")
    
    # Test 404 with random UUID
    print("\nTesting 404 with random UUID...")
    random_uuid = str(uuid.uuid4())
    
    try:
        response = requests.get(f"{API_BASE}/leads/{random_uuid}", timeout=10)
        
        if response.status_code == 404:
            log_test("Get single lead 404 test", True, f"Correctly returned 404 for non-existent lead")
        else:
            log_test("Get single lead 404 test", False, f"Expected 404, got {response.status_code}")
    
    except Exception as e:
        log_test("Get single lead 404 test", False, f"Exception: {str(e)}")

def test_9_update_lead_status(lead_id: Optional[str] = None):
    """Test 9: PATCH /api/leads/{lead_id}/status - Update status"""
    print("=" * 80)
    print("TEST 9: PATCH /api/leads/{lead_id}/status - Update status")
    print("=" * 80)
    
    # If no lead_id provided, create one
    if not lead_id:
        print("No lead_id provided, creating a new lead first...")
        lead_id = test_2_create_lead_full()
        if not lead_id:
            log_test("Update lead status (no ID available)", False, "Could not create lead for testing")
            return
    
    # Test valid status update
    try:
        response = requests.patch(f"{API_BASE}/leads/{lead_id}/status?status=contacted", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "contacted":
                log_test("Update lead status to 'contacted'", True, f"Status updated successfully")
                
                # Verify with GET
                verify_response = requests.get(f"{API_BASE}/leads/{lead_id}", timeout=10)
                if verify_response.status_code == 200:
                    verify_data = verify_response.json()
                    if verify_data.get("status") == "contacted":
                        log_test("Verify status update with GET", True, "Status persisted correctly")
                    else:
                        log_test("Verify status update with GET", False, f"Status not persisted: {verify_data.get('status')}")
            else:
                log_test("Update lead status", False, f"Expected status='contacted', got {data.get('status')}")
        else:
            log_test("Update lead status", False, f"Expected 200, got {response.status_code}. Response: {response.text}")
    
    except Exception as e:
        log_test("Update lead status", False, f"Exception: {str(e)}")
    
    # Test invalid status
    print("\nTesting invalid status...")
    try:
        response = requests.patch(f"{API_BASE}/leads/{lead_id}/status?status=invalid", timeout=10)
        
        if response.status_code == 400:
            log_test("Update lead status with invalid value", True, "Correctly returned 400 for invalid status")
        else:
            log_test("Update lead status with invalid value", False, f"Expected 400, got {response.status_code}")
    
    except Exception as e:
        log_test("Update lead status validation", False, f"Exception: {str(e)}")

def test_10_status_endpoints():
    """Test 10: POST /api/status and GET /api/status"""
    print("=" * 80)
    print("TEST 10: POST /api/status and GET /api/status")
    print("=" * 80)
    
    # Test POST /api/status
    payload = {
        "client_name": "Backend Test Client"
    }
    
    try:
        response = requests.post(f"{API_BASE}/status", json=payload, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if "id" in data and "client_name" in data and "timestamp" in data:
                log_test("POST /api/status", True, f"Status check created with ID: {data['id']}")
            else:
                log_test("POST /api/status", False, f"Missing fields in response: {data}")
        else:
            log_test("POST /api/status", False, f"Expected 200, got {response.status_code}")
    
    except Exception as e:
        log_test("POST /api/status", False, f"Exception: {str(e)}")
    
    # Test GET /api/status
    try:
        response = requests.get(f"{API_BASE}/status", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                log_test("GET /api/status", True, f"Retrieved {len(data)} status checks")
            else:
                log_test("GET /api/status", False, f"Expected list, got {type(data)}")
        else:
            log_test("GET /api/status", False, f"Expected 200, got {response.status_code}")
    
    except Exception as e:
        log_test("GET /api/status", False, f"Exception: {str(e)}")

def print_summary():
    """Print test summary"""
    print("\n" + "=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    print(f"Total Tests: {test_results['total']}")
    print(f"Passed: {len(test_results['passed'])} ✅")
    print(f"Failed: {len(test_results['failed'])} ❌")
    print()
    
    if test_results['failed']:
        print("FAILED TESTS:")
        for test in test_results['failed']:
            print(f"  ❌ {test}")
        print()
    
    if test_results['passed']:
        print("PASSED TESTS:")
        for test in test_results['passed']:
            print(f"  ✅ {test}")
    
    print("=" * 80)

def main():
    """Run all tests"""
    print("\n" + "=" * 80)
    print("VIKNAR'OFF VINNYTSIA - BACKEND API TEST SUITE")
    print("=" * 80)
    print(f"Backend URL: {BACKEND_URL}")
    print(f"API Base: {API_BASE}")
    print(f"Test started at: {datetime.now().isoformat()}")
    print("=" * 80 + "\n")
    
    # Run tests in sequence
    test_1_health_check()
    
    # Create leads and store IDs for later tests
    lead_id_1 = test_2_create_lead_full()
    test_3_create_lead_validation()
    lead_id_2 = test_4_create_lead_with_product()
    
    # List and filter tests
    test_5_list_leads()
    test_6_list_leads_with_limit()
    test_7_list_leads_by_status()
    
    # Single lead operations (use lead_id_1 if available)
    test_8_get_single_lead(lead_id_1)
    test_9_update_lead_status(lead_id_2 or lead_id_1)
    
    # Status endpoints
    test_10_status_endpoints()
    
    # Print summary
    print_summary()
    
    # Exit with appropriate code
    if test_results['failed']:
        exit(1)
    else:
        exit(0)

if __name__ == "__main__":
    main()
