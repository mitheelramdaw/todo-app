
# 📝 Full-Stack To-Do Application

**FastAPI + React (TypeScript) + Docker**

This project is a simple yet complete To-Do list application built as part of a technical practical test.
It demonstrates a full-stack architecture using **FastAPI** for the backend, **React + TypeScript** for the frontend, and **Docker + Docker Compose** for containerized deployment.

---

## 🚀 Features

* ✅ Create, Read, Update, and Delete (CRUD) to-do items
* ✅ Persistent storage via SQLite
* ✅ RESTful API with automatic Swagger docs
* ✅ Modern React frontend served by Nginx
* ✅ Fully containerized (backend + frontend) with Docker
* ✅ Pytest test suite for backend endpoints
* ✅ Simple, clean, and responsive UI

---

## 🧠 Tech Stack

| Layer                | Technology                                |
| :------------------- | :---------------------------------------- |
| **Frontend**         | React + TypeScript + Vite + Axios + Nginx |
| **Backend**          | FastAPI + SQLAlchemy + Pydantic + Uvicorn |
| **Database**         | SQLite (lightweight local file)           |
| **Testing**          | Pytest                                    |
| **Containerization** | Docker & Docker Compose                   |

---

## 🏗️ Project Structure

```
todo-app/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── todos.db
│   └── test_main.py
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── TodoItem.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Getting Started

### 1️⃣ Prerequisites

Make sure you have the following installed:

* [Docker Desktop](https://www.docker.com/products/docker-desktop/)
* (Optional) Python 3.11 + Node 20 if you want to run locally

---

### 2️⃣ Run with Docker

```bash
# Stop any running containers first
docker-compose down

# Build all images
docker-compose build --no-cache

# Run the stack
docker-compose up
```

Once running:

| Service                         | URL                                                      | Description           |
| :------------------------------ | :------------------------------------------------------- | :-------------------- |
| 🧠 **Backend (FastAPI)**        | [http://localhost:8000/docs](http://localhost:8000/docs) | API Docs / Swagger UI |
| 💻 **Frontend (React + Nginx)** | [http://localhost:5173](http://localhost:5173)           | To-Do Web App         |

---

### 3️⃣ Run Backend Tests (Locally)

```bash
cd backend
pytest -v
```

---

## 🧩 API Endpoints

| Method   | Endpoint      | Description              |
| :------- | :------------ | :----------------------- |
| `GET`    | `/todos`      | Get all to-dos           |
| `POST`   | `/todos`      | Create a new to-do       |
| `PUT`    | `/todos/{id}` | Update an existing to-do |
| `DELETE` | `/todos/{id}` | Delete a to-do           |
| `GET`    | `/`           | Root status check        |

The API automatically serves Swagger UI at `/docs`.

---

## 🎨 Frontend UI

* Responsive React interface built with Vite + TypeScript
* Click a task to toggle its completion
* Delete tasks instantly
* Styled for readability over a background image
* Connected directly to the FastAPI backend

---

## 🧪 Testing

Backend tests use `pytest` and FastAPI’s `TestClient` to validate:

* `/` root endpoint
* CRUD operations for `/todos`

To run all tests manually:

```bash
cd backend
pytest -v
```

---

## 🧰 Development Tips

* If you change dependencies, rebuild images:

  ```bash
  docker-compose build --no-cache
  ```
* To restart containers:

  ```bash
  docker-compose down && docker-compose up
  ```
* Logs:

  ```bash
  docker-compose logs -f
  ```

---

## 💡 Future Improvements (Optional Enhancements)

* Add frontend filtering (All / Active / Completed)
* Add search functionality
* Add authentication / user accounts
* Deploy to Render / Vercel / Fly.io

---

## 👨‍💻 Author

**Mitheel Ramdaw**
📧 [mitheelramdaw@gmail.com](mailto:mitheelramdaw@gmail.com)
🧠 Built using FastAPI and React
