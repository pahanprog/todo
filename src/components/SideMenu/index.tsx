import React, { useContext, useEffect, useRef, useState } from "react";
import { AdaptiveContext } from "../../contexts/AdaptiveProvider";
import { PathContext } from "../../contexts/PathContext";
import { TodosContext } from "../../contexts/TodosContext";
import TodoItemStateIcon from "../TodoItemStateIcon";
import "./styles.css";

const SideMenu = () => {
  const { todos, addTodo, removeTodo } = useContext(TodosContext);
  const { path, changePath } = useContext(PathContext);
  const { sideBarOpen, toggleSideBarOpen } = useContext(AdaptiveContext);

  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (input !== "") {
        addTodo({ title: input });
      }
    }
  };

  const prevTodosLenght = useRef(todos.length);

  useEffect(() => {
    setInput("");
    if (ulDummyDivRef.current) {
      ulDummyDivRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (path === "/" || todos.length !== prevTodosLenght.current) {
      changePath(todos[todos.length - 1]?.slug);
    }
    prevTodosLenght.current = todos.length;
  }, [todos]);

  const ulDummyDivRef = useRef<HTMLDivElement | null>(null);

  const handleRemoveTodo = (slug: string) => {
    if (slug === "/") return;
    removeTodo(slug);
    changePath("/");
  };

  const BORDER_SIZE = 4;
  const panel = useRef<HTMLDivElement | null>(null);

  let m_pos = 0;

  const clampPanelSize = (width: number) => Math.min(Math.max(width, 280), 500);

  const resize = (e: MouseEvent) => {
    const dx = m_pos - e.x;
    m_pos = e.x;
    panel.current!.style.width =
      clampPanelSize(
        parseInt(getComputedStyle(panel.current!, "").width) - dx
      ) + "px";
  };

  useEffect(() => {
    panel.current?.addEventListener(
      "mousedown",
      (e) => {
        if (
          e.offsetX - BORDER_SIZE <
          parseInt(getComputedStyle(panel.current!, "").width) - BORDER_SIZE
        ) {
          m_pos = e.x;
          document.addEventListener("mousemove", resize, false);
        }
      },
      false
    );

    document.addEventListener(
      "mouseup",
      (e) => {
        document.removeEventListener("mousemove", resize, false);
      },
      false
    );

    return () => {
      panel.current?.removeEventListener("mousedown", resize, false);
      document.removeEventListener("mousemove", resize, false);
    };
  }, []);

  return (
    <div
      className={`todo_list_container ${sideBarOpen ? "open" : "closed"}`}
      ref={(el) => (panel.current = el)}
    >
      <div className="burger-close" onClick={toggleSideBarOpen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-x-lg"
          viewBox="0 0 16 16"
        >
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
        </svg>
      </div>
      <div className="search-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <ul>
        {todos.map((todo, index) => {
          if (
            search &&
            !todo.title.toLowerCase().includes(search.toLowerCase())
          ) {
            return null;
          }
          return (
            <li
              key={index}
              onClick={() => {
                changePath(todo.slug);
              }}
              className={path === todo.slug ? "selected" : ""}
            >
              <div className={`todo-item ${todo.complete && "complete"}`}>
                <TodoItemStateIcon {...todo} />
                <div className="todo_title">{todo.title}</div>
                <div
                  className="todo_delete_btn"
                  onClick={() => {
                    handleRemoveTodo(todo.slug);
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
                      fill-rule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    />
                  </svg>
                </div>
              </div>
            </li>
          );
        })}
        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => (ulDummyDivRef.current = el)}
        ></div>
      </ul>
      <div
        className="create_todo_button_container"
        onClick={() => {
          if (input !== "") {
            addTodo({ title: input });
          }
        }}
      >
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
          type="text"
          placeholder="Create new task"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default SideMenu;
