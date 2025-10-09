import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const API_URL =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:8000/todos"
    : "http://backend:8000/todos";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos from backend
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(API_URL);
        setTodos(res.data);
      } catch (err) {
        console.error("Could not fetch todos:", err);
        setError("❌ Cannot connect to backend.");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  // Add new todo
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const res = await axios.post(API_URL, { title: newTodo, completed: false });
      setTodos([...todos, res.data]);
      setNewTodo("");
    } catch {
      setError("❌ Failed to add task.");
    }
  };

  // Toggle completion
  const toggleTodo = async (id: number, completed: boolean, title: string) => {
    try {
      await axios.put(`${API_URL.replace("/todos", "")}/todos/${id}`, {
        title,
        completed: !completed,
      });
      setTodos(
        todos.map((t) => (t.id === id ? { ...t, completed: !completed } : t))
      );
    } catch {
      setError("❌ Failed to update task.");
    }
  };

  // Delete todo
  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`${API_URL.replace("/todos", "")}/todos/${id}`);
      setTodos(todos.filter((t) => t.id !== id));
    } catch {
      setError("❌ Failed to delete task.");
    }
  };

  // Apply filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // all
  });

  // Task counter
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="app">
      <h1>📝 To-Do List</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="add-todo">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* Filters */}
      <div className="filters">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={filter === "active" ? "active" : ""}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? "active" : ""}
        >
          Completed
        </button>
      </div>

      {/* Counter */}
      <p className="counter">
        {completedCount}/{todos.length} tasks completed
      </p>

      <ul className="todo-list">
        {filteredTodos.length === 0 && !loading && <p>No tasks found.</p>}
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="todo-item"
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            <span onClick={() => toggleTodo(todo.id, todo.completed, todo.title)}>
              {todo.title}
            </span>
            <button
              className="delete-btn"
              onClick={() => deleteTodo(todo.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
