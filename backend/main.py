
# FastAPI To-Do Backend (Final Docker-Ready Version)


from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session


# App initialisation

app = FastAPI(title="FastAPI To-Do API", version="1.0")


# CORS (React frontend access)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later I can restrict to ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Database setup (SQLite for now)

DATABASE_URL = "sqlite:///./todos.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()



# Database Model

class Todo(Base):
    __tablename__ = "todos"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    completed = Column(Boolean, default=False)


Base.metadata.create_all(bind=engine)



#  Pydantic Schemas

class TodoBase(BaseModel):
    title: str
    completed: bool = False


class TodoCreate(TodoBase):
    pass


class TodoResponse(TodoBase):
    id: int

    class Config:
        from_attributes = True  #  Pydantic v2 replacement for orm_mode



# Dependency (DB session)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



#  CRUD Routes


@app.get("/todos", response_model=List[TodoResponse])
def get_todos(db: Session = Depends(get_db)):
    return db.query(Todo).all()


@app.post("/todos", response_model=TodoResponse)
def create_todo(todo: TodoCreate, db: Session = Depends(get_db)):
    new_todo = Todo(title=todo.title, completed=todo.completed)
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return new_todo


@app.put("/todos/{todo_id}", response_model=TodoResponse)
def update_todo(todo_id: int, updated: TodoCreate, db: Session = Depends(get_db)):
    todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    todo.title = updated.title
    todo.completed = updated.completed
    db.commit()
    db.refresh(todo)
    return todo


@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    db.delete(todo)
    db.commit()
    return {"message": f"Todo '{todo.title}' deleted successfully"}



#  Root + Startup Logs

@app.get("/")
def root():
    return {"message": "✅ FastAPI To-Do backend running successfully!"}


@app.on_event("startup")
def startup_event():
    print("⚙️  Backend (FastAPI) is starting...")
    print("📖  Swagger Docs: http://localhost:8000/docs")
    print("----------------------------------------------------")
