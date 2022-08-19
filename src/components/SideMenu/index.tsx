import React, { useContext, useEffect, useRef, useState } from "react";
import { AdaptiveContext } from "../../contexts/AdaptiveProvider";
import { PathContext } from "../../contexts/PathContext";
import { TodosContext } from "../../contexts/TodosContext";
import ListSearch from "../ListSearch";
import TodoListItem from "../TodoListItem";
import CreateTodo from "../CreateTodo";

import "./styles.css";

const SideMenu = () => {
  const { todos } = useContext(TodosContext);
  const { path, changePath } = useContext(PathContext);
  const { sideBarOpen, toggleSideBarOpen } = useContext(AdaptiveContext);

  const [search, setSearch] = useState("");

  /* Ref, хранящий прошлую длинну списка задач (для работы авто скролла ниже) */

  const prevTodosLenght = useRef(todos.length);

  /* Ref элемента внизу списка (для работы авто скрола ниже) */

  const ulDummyDivRef = useRef<HTMLDivElement | null>(null);

  /* Useeffect, который на первый рендер выбирает последнюю созданную задачу и скролит список задач при создании новой */

  useEffect(() => {
    if (
      ulDummyDivRef.current &&
      !search &&
      todos.length > prevTodosLenght.current
    ) {
      ulDummyDivRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (path === "/") {
      changePath(todos[todos.length - 1]?.slug);
    }
    prevTodosLenght.current = todos.length;
  }, [todos]);

  /* Ниже все используется для изменения ширины левой панели путем удержания и перемещения правой границы (Ref элемента, константа размера области для удержания) */
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
          e.offsetX >
            parseInt(getComputedStyle(panel.current!, "").width) -
              BORDER_SIZE &&
          getWindowWidth() > 768
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

  const getWindowWidth = () => {
    return window.innerWidth;
  };

  useEffect(() => {
    const handleResize = () => {
      const width = getWindowWidth();

      if (width <= 768 && panel.current) {
        panel.current.removeAttribute("style");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`todo_list_container ${sideBarOpen ? "open" : "closed"}`}
      ref={(el) => (panel.current = el)}
    >
      {/* Кнопка закрытия панели для адаптивности */}
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
      {/* Компонент поиска  */}
      <ListSearch value={search} onChange={setSearch} />
      {/* Список задач  */}
      <ul>
        {todos.map((todo) => {
          if (
            search &&
            !todo.title.toLowerCase().includes(search.toLowerCase())
          ) {
            return null;
          }
          return (
            <TodoListItem
              key={todo.slug}
              {...todo}
              selected={todo.slug === path}
            />
          );
        })}
        {/* Нижний элемент используемый для авто скрола */}
        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => (ulDummyDivRef.current = el)}
        />
      </ul>
      {/* Компонент создания новой задачи */}
      <CreateTodo />
    </div>
  );
};

export default SideMenu;
