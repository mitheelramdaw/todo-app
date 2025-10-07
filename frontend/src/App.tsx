import { useEffect, useState } from "react";
import axios from "axios";

// ✅ Define Todo type for TypeScript
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");

  const API_URL = "http://localhost:8000/todos";

  // ✅ Fetch todos
  const fetchTodos = async () => {
    const res = await axios.get<Todo[]>(API_URL);
    setTodos(res.data);
  };

  // ✅ Add new todo
  const addTodo = async () => {
    if (!title.trim()) return;
    await axios.post(API_URL, { title, completed: false });
    setTitle("");
    fetchTodos();
  };

  // ✅ Toggle completion
  const toggleTodo = async (id: number, completed: boolean, title: string) => {
    await axios.put(`${API_URL}/${id}`, { title, completed: !completed });
    fetchTodos();
  };

  // ✅ Delete a todo
  const deleteTodo = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>📝 FastAPI + React + TypeScript To-Do</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "1rem" }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter new todo..."
        style={{ flex: 1, padding: "8px" }}
      />
      <button onClick={addTodo}>Add</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.5rem",
              padding: "8px",
              backgroundColor: "#f5f5f5",
              borderRadius: "5px",
            }}
          >
            <span
              onClick={() => toggleTodo(todo.id, todo.completed, todo.title)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.title}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
