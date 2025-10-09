from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_read_root():
    """Ensure the root endpoint returns the expected startup message."""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {
        "message": "✅ FastAPI To-Do backend running successfully!"
    }


def test_create_todo():
    """Test creating a new todo item."""
    response = client.post("/todos", json={"title": "Test Task", "completed": False})
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Task"
    assert data["completed"] is False
    assert "id" in data


def test_get_todos():
    """Ensure the list endpoint returns at least one todo."""
    # Create one to guarantee the list isn't empty
    client.post("/todos", json={"title": "List Check", "completed": False})
    response = client.get("/todos")
    assert response.status_code == 200
    todos = response.json()
    assert isinstance(todos, list)
    assert len(todos) > 0


def test_update_todo():
    """Verify updating an existing todo works."""
    todo = client.post("/todos", json={"title": "Old Title", "completed": False}).json()
    todo_id = todo["id"]

    response = client.put(
        f"/todos/{todo_id}",
        json={"title": "Updated Title", "completed": True},
    )
    assert response.status_code == 200
    updated = response.json()
    assert updated["title"] == "Updated Title"
    assert updated["completed"] is True


def test_delete_todo():
    """Confirm deleting a todo returns the expected message."""
    todo = client.post("/todos", json={"title": "Delete Me", "completed": False}).json()
    todo_id = todo["id"]

    response = client.delete(f"/todos/{todo_id}")
    assert response.status_code == 200
    message = response.json()["message"]
    assert f"Todo '{todo['title']}' deleted successfully" in message
