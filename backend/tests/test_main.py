import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_questions():
    response = client.get("/api/questions")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_services():
    response = client.get("/api/services")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_tips():
    response = client.get("/api/tips")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
