from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# ------------------------------------------------------
# 1. Initialize the FastAPI app
# ------------------------------------------------------
app = FastAPI()

# ------------------------------------------------------
# 2. Enable CORS so React frontend can connect
# ------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],           # You can later change this to ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------------
# 3. Database setup (SQLite)
# ------------------------------------------------------
DATABASE_URL = "sqlite:///./todos.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

# ------------------------------------------------------
# 4. SQLAlchemy Todo model
# ------------------------------------------------------
class Todo(Base):
    __tablename__ = "todos"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    completed = Column(Boolean, default=False)

Base.metadata.create_all(bind=engine)

# ------------------------------------------------------
# 5. Pydantic Schema (for request/response)
# ------------------------------------------------------
class TodoSchema(BaseModel):
    title: str
    completed: bool = False

    class Config:
        from_attributes = True  # ✅ Pydantic v2 replacement for orm_mode

# ------------------------------------------------------
# 6. CRUD API routes
# ------------------------------------------------------

# Read all todos
@app.get("/todos", response_model=List[TodoSchema])
def read_todos():
    db = SessionLocal()
    todos = db.query(Todo).all()
    db.close()
    return todos

# Create a new todo
@app.post("/todos", response_model=TodoSchema)
def create(todo: TodoSchema):
    db = SessionLocal()
    db_todo = Todo(title=todo.title, completed=todo.completed)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    db.close()
    return db_todo

# Update a todo
@app.put("/todos/{todo_id}")
def update(todo_id: int, todo: TodoSchema):
    db = SessionLocal()
    db_todo = db.query(Todo).get(todo_id)
    if not db_todo:
        db.close()
        raise HTTPException(status_code=404, detail="Todo not found")
    db_todo.title = todo.title
    db_todo.completed = todo.completed
    db.commit()
    db.close()
    return {"message": "Updated successfully"}

# Delete a todo
@app.delete("/todos/{todo_id}")
def delete(todo_id: int):
    db = SessionLocal()
    db_todo = db.query(Todo).get(todo_id)
    if not db_todo:
        db.close()
        raise HTTPException(status_code=404, detail="Todo not found")
    db.delete(db_todo)
    db.commit()
    db.close()
    return {"message": "Deleted successfully"}

# ------------------------------------------------------
# 7. Root endpoint (simple message)
# ------------------------------------------------------
@app.get("/")
def root():
    return {"message": "FastAPI To-Do backend running successfully!"}
