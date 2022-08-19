import React, { useContext } from "react";
import { TodosContext } from "../../contexts/TodosContext";

import "./styles.css";

interface Props {
  slug: string;
  inProgress: boolean;
  complete: boolean;
}

const TodoItemStateIcon = ({ slug, complete, inProgress }: Props) => {
  const { updateTodoState } = useContext(TodosContext);
  return (
    <div
      className="todo_item_state_icon"
      onClick={() => {
        updateTodoState(slug);
      }}
    >
      {inProgress && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#5865f2"
          className="bi bi-stopwatch"
          viewBox="0 0 16 16"
          style={{ marginTop: "-1px" }}
        >
          <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z" />
          <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z" />
        </svg>
      )}
      {complete && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#00AD83"
          className="bi bi-check-lg"
          viewBox="0 0 16 16"
        >
          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
        </svg>
      )}
    </div>
  );
};

export default TodoItemStateIcon;
