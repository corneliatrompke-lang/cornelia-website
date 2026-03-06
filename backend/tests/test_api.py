"""Backend API tests for Cornelia Trompke Consulting website"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestHealth:
    """Health check tests"""

    def test_api_root(self):
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data


class TestContact:
    """Contact form API tests"""

    def test_submit_contact_success(self):
        payload = {
            "name": "Test User",
            "email": "test@test.com",
            "organisation": "Test Corp",
            "role": "Manager",
            "message": "Test inquiry"
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "Test User"
        assert data["email"] == "test@test.com"
        assert data["message"] == "Test inquiry"
        assert "id" in data
        assert "created_at" in data

    def test_submit_contact_minimal(self):
        """Submit with only required fields"""
        payload = {
            "name": "TEST_Minimal User",
            "email": "minimal@test.com",
            "message": "Minimal test"
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "TEST_Minimal User"
        assert data["organisation"] is None
        assert data["role"] is None

    def test_submit_contact_invalid_email(self):
        payload = {
            "name": "Bad Email",
            "email": "not-an-email",
            "message": "Test"
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422

    def test_submit_contact_missing_required(self):
        """Missing name should fail"""
        payload = {"email": "test@test.com", "message": "Test"}
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422

    def test_get_contacts(self):
        response = requests.get(f"{BASE_URL}/api/contact")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
