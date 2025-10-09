# backend/test_main.py
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    # Match exact message from your backend
    assert response.json() == {"message": "✅ FastAPI To-Do backend running successfully!"}


def test_create_todo():
    response = client.post("/todos", json={"title": "Test To-Do", "completed": False})
    assert response.status_code == 200
    data = response.json()
    assert "id" in data
    assert data["title"] == "Test To-Do"
    assert data["completed"] is False


def test_get_todos():
    response = client.get("/todos")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_update_todo():
    # Create a todo first
    todo = client.post("/todos", json={"title": "To Update", "completed": False}).json()
    todo_id = todo["id"]

    # Update it
    response = client.put(f"/todos/{todo_id}", json={"title": "Updated", "completed": True})
    assert response.status_code == 200

    data = response.json()
    # Match backend structure
    assert data["title"] == "Updated"
    assert data["completed"] is True


def test_delete_todo():
    # Create a todo first
    todo = client.post("/todos", json={"title": "To Delete", "completed": False}).json()
    todo_id = todo["id"]

    # Delete it
    response = client.delete(f"/todos/{todo_id}")
    assert response.status_code == 200

    data = response.json()
    # Match exact response structure
    assert "deleted successfully" in data["message"].lower()
