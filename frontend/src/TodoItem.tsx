import { useState } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface Props {
  todo: Todo;
  updateTodo: (id: number, completed: boolean, title: string) => void;
  deleteTodo: (id: number) => void;
}

export default function TodoItem({ todo, updateTodo, deleteTodo }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleSave = () => {
    if (editedTitle.trim() !== todo.title) {
      updateTodo(todo.id, todo.completed, editedTitle.trim());
    }
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => updateTodo(todo.id, !todo.completed, todo.title)}
      />

      {isEditing ? (
        <input
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          autoFocus
        />
      ) : (
        <span
          className={todo.completed ? "completed" : ""}
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </span>
      )}

      <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
        ✖
      </button>
    </div>
  );
}
