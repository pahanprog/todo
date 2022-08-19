import React, { useContext } from "react";
import { PathContext } from "../../contexts/PathContext";
import { TodosContext } from "../../contexts/TodosContext";
import TodoItemStateIcon from "../TodoItemStateIcon";

import "./styles.css";

interface Props {
  slug: string;
  title: string;
  selected: boolean;
  inProgress: boolean;
  complete: boolean;
}

const TodoListItem = ({
  slug,
  title,
  selected,
  inProgress,
  complete,
}: Props) => {
  const { changePath } = useContext(PathContext);
  const { removeTodo } = useContext(TodosContext);

  const handleRemoveTodo = (slug: string) => {
    if (slug === "/") return;
    removeTodo(slug);
  };

  return (
    <li
      onClick={() => {
        changePath(slug);
      }}
      className={selected ? "selected" : ""}
    >
      <div className={`todo-item ${complete && "complete"}`}>
        {/* Компонент отображающий состояние задачи */}
        <TodoItemStateIcon
          complete={complete}
          inProgress={inProgress}
          slug={slug}
        />
        <div className="todo_title">{title}</div>
        {/* Кнопка удаления задачи */}
        <div
          className="todo_delete_btn"
          onClick={(e) => {
            // остановка пропогации, чтобы parent компонент не начал евент клика
            e.stopPropagation();
            handleRemoveTodo(slug);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
              fillRule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </div>
      </div>
    </li>
  );
};

export default TodoListItem;
