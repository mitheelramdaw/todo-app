import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Auto-detect correct backend URL
const API_URL =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:8000/todos"
    : "http://backend:8000/todos";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos
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

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`${API_URL.replace("/todos", "")}/todos/${id}`);
      setTodos(todos.filter((t) => t.id !== id));
    } catch {
      setError("❌ Failed to delete task.");
    }
  };

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

      <ul className="todo-list">
        {todos.length === 0 && !loading && <p>No tasks yet.</p>}
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            <span onClick={() => toggleTodo(todo.id, todo.completed, todo.title)}>
              {todo.title}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                background: "crimson",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                padding: "4px 8px",
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
