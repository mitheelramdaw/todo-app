interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface Props {
  todo: Todo;
  toggleTodo: (id: number, completed: boolean, title: string) => void;
  deleteTodo: (id: number) => void;
}

export default function TodoItem({ todo, toggleTodo, deleteTodo }: Props) {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id, todo.completed, todo.title)}
      />
      <span className={todo.completed ? "completed" : ""}>{todo.title}</span>
      <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
        ✖
      </button>
    </div>
  );
}
