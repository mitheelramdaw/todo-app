
# 📝 Full-Stack To-Do Application

[![Backend Tests (FastAPI)](https://github.com/mitheelramdaw/todo-app/actions/workflows/backend-tests.yml/badge.svg)](https://github.com/mitheelramdaw/todo-app/actions/workflows/backend-tests.yml)

**FastAPI + React (TypeScript) + Docker**

This project is a simple yet complete **To-Do list application** built as part of a technical practical test.  
It demonstrates a full-stack architecture using **FastAPI** for the backend, **React + TypeScript** for the frontend,  
and **Docker Compose** for containerized deployment.

---

## 🚀 Features

* ✅ Create, Read, Update, and Delete (CRUD) to-do items  
* ✅ Persistent storage using SQLite  
* ✅ RESTful API with automatic Swagger docs  
* ✅ Modern React frontend (TypeScript + Vite)  
* ✅ Simple and responsive UI  
* ✅ GitHub Actions CI/CD for automated backend tests  
* ✅ Background image with legible styled text  

---

## 🧠 Tech Stack

| Layer                | Technology                                |
| :------------------- | :---------------------------------------- |
| **Frontend**         | React + TypeScript + Vite + Axios + Nginx |
| **Backend**          | FastAPI + SQLAlchemy + Pydantic + Uvicorn |
| **Database**         | SQLite (local file)                       |
| **Testing**          | Pytest + FastAPI TestClient               |
| **Automation**       | GitHub Actions                            |
| **Containerization** | Docker & Docker Compose                   |

---

## 🏗️ Project Structure

```

todo-app/
├── .github/
│ └── workflows/
│ └── backend-tests.yml
│
├── backend/
│ ├── main.py
│ ├── test_main.py
│ ├── requirements.txt
│ ├── Dockerfile
│ ├── entrypoint.sh
│ └── todos.db
│
├── frontend/
│ ├── src/
│ │ ├── App.tsx
│ │ ├── TodoItem.tsx
│ │ ├── main.tsx
│ │ ├── index.css
│ │ └── assets/
│ ├── public/
│ │ └── vite.svg
│ ├── Dockerfile
│ ├── nginx.conf
│ ├── package.json
│ ├── tsconfig.json
│ ├── vite.config.ts
│ ├── entrypoint.sh
│ └── eslint.config.js
│
├── docker-compose.yml
├── README.md
├── todos.db
└── Submission Videos/

````

---

## ⚙️ Getting Started

### 1️⃣ Prerequisites

Make sure you have:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- (Optional) Python 3.11 + Node 20 for running locally

---

### 2️⃣ Run the App with Docker

```bash
# Stop any running containers first
docker-compose down

# Build all images
docker-compose build --no-cache

# Run the full stack
docker-compose up
````

Once running:

| Service                         | URL                                                      | Description           |
| :------------------------------ | :------------------------------------------------------- | :-------------------- |
| 🧠 **Backend (FastAPI)**        | [http://localhost:8000/docs](http://localhost:8000/docs) | API Docs / Swagger UI |
| 💻 **Frontend (React + Nginx)** | [http://localhost:5173](http://localhost:5173)           | To-Do Web App         |

---

### 3️⃣ Run Backend Tests Locally

```bash
cd backend
pytest -v
```

All backend tests are automatically executed on **GitHub Actions** for every push or pull request to the `main` branch.

---

## 🧩 API Endpoints

| Method   | Endpoint      | Description              |
| :------- | :------------ | :----------------------- |
| `GET`    | `/todos`      | Get all to-dos           |
| `POST`   | `/todos`      | Create a new to-do       |
| `PUT`    | `/todos/{id}` | Update an existing to-do |
| `DELETE` | `/todos/{id}` | Delete a to-do           |
| `GET`    | `/`           | Root status check        |

Swagger UI available at `/docs`.

---

## 🎨 Frontend UI

* Clean and responsive React interface
* Click a task to mark it complete / incomplete
* Delete tasks instantly
* Background image with readable text overlay
* Built using Vite + TypeScript for fast builds

---

## 🧪 Continuous Integration (CI)

Each push automatically triggers a **GitHub Actions workflow** that:

1. Sets up a Python 3.11 environment
2. Installs backend dependencies
3. Runs all `pytest` tests inside `backend/`
4. Marks the commit ✅ **Passed** or ❌ **Failed**

---

## 🧰 Development Tips

* Rebuild if dependencies change:

  ```bash
  docker-compose build --no-cache
  ```
* Restart everything:

  ```bash
  docker-compose down && docker-compose up
  ```
* Check logs:

  ```bash
  docker-compose logs -f
  ```

---

## 💡 Optional Enhancements

* Add frontend filtering (All / Active / Completed)
* Add search functionality
* Add authentication / user accounts
* Deploy on Render / Vercel / Fly.io

---

## 🧠 CI/CD Status

The badge at the top of this README automatically updates
whenever tests pass or fail in GitHub Actions.

✅ Green = all backend tests passing
❌ Red = some tests failed

---

## 📸 Screenshots

### Add Task / Landing

![Add task view](https://github.com/user-attachments/assets/69548275-c028-42a8-bcec-9fb10645e810)

### Toggle Task

![Completed task](https://github.com/user-attachments/assets/61d300fd-4c25-489e-b345-546fe2f47a47)

### Active

![Active tasks](https://github.com/user-attachments/assets/c2e542f7-e008-4a3c-9ca6-9c416dfba4bb)

### Completed

![Completed tasks](https://github.com/user-attachments/assets/72737621-7d3b-408b-b716-43cb9566ab59)

### Deleted

![Deleted tasks](https://github.com/user-attachments/assets/7bfca4ca-5e6c-4b29-b6d7-a1172755bf57)

---

## 👨‍💻 Author

**Mitheel Ramdaw**
📧 [mitheelramdaw@gmail.com](mailto:mitheelramdaw@gmail.com)
🧠 Built with FastAPI & React
🚀 Fully tested with GitHub Actions
