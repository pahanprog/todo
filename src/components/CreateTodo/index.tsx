import React, { useContext, useRef } from "react";
import { TodosContext } from "../../contexts/TodosContext";

import "./styles.css";

const CreateTodo = () => {
  const { addTodo } = useContext(TodosContext);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onCreate();
    }
  };

  const onCreate = () => {
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      addTodo({ title: inputRef.current.value.trim() });
      inputRef.current.value = "";
    }
  };

  return (
    <div className="create_todo_button_container" onClick={onCreate}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-plus-lg"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
        />
      </svg>
      <input
        ref={(el) => (inputRef.current = el)}
        type="text"
        placeholder="Create new task"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default CreateTodo;
