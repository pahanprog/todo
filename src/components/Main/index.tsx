import React, { useContext, useEffect, useState } from "react";
import { PathContext } from "../../contexts/PathContext";
import { TodosContext } from "../../contexts/TodosContext";
import { TodoItem } from "../../types";
import {
  getCurrentDay,
  getCurrentMonth,
  getCurrentWeekDay,
  getTime,
  getTimeOfDay,
} from "../../utils/getDate";
import InlineEdit from "../InlineEdit";
import TodoItemStateIcon from "../TodoItemStateIcon";
import "./styles.css";

const Main = () => {
  const { todos, changeTodoParameters, removeTodo } = useContext(TodosContext);
  const { path, changePath } = useContext(PathContext);

  const [todo, setTodo] = useState<TodoItem>();

  const handleRemoveTodo = (slug: string) => {
    if (slug === "/") return;
    removeTodo(slug);
    changePath("/");
  };

  useEffect(() => {
    const todoBasedOnCurrentPath = todos.filter(
      (todo) => todo.slug === path
    )[0];

    setTodo(todoBasedOnCurrentPath);
  }, [path, todos]);

  return (
    <div className="selected_todo_container">
      <h1 className="">Good {getTimeOfDay()}</h1>
      <h2>
        It's {getCurrentWeekDay()}, {getCurrentMonth()} {getCurrentDay()}
      </h2>
      <div className="todo_info_container">
        {todo ? (
          <>
            <div className="todo_main_header">
              <div
                className={`todo_state_container ${
                  todo.inProgress
                    ? "in-progress"
                    : todo.complete
                    ? "complete"
                    : ""
                }`}
              >
                <TodoItemStateIcon {...todo} />
                <div className="todo_state_message">
                  {todo.inProgress
                    ? "In progress"
                    : todo.complete
                    ? "Complete"
                    : ""}
                </div>
              </div>
              <div
                className="todo_delete_btn"
                onClick={() => {
                  handleRemoveTodo(todo.slug);
                }}
              >
                Delete task
              </div>
            </div>
            <div className="todo_main_info">
              <div className="title-container">
                title:{" "}
                <InlineEdit
                  value={todo.title}
                  setValue={(value) => {
                    changeTodoParameters(todo.slug, {
                      title: value,
                      description: todo.description,
                    });
                  }}
                />
              </div>
              {todo.description ? (
                <div className="description-container">
                  description:{" "}
                  <InlineEdit
                    value={todo.description}
                    setValue={(value) => {
                      changeTodoParameters(todo.slug, {
                        title: todo.title,
                        description: value,
                      });
                    }}
                    textarea={true}
                  />
                </div>
              ) : (
                <div className="description-container">
                  Add description:{" "}
                  <InlineEdit
                    value={""}
                    setValue={(value) => {
                      changeTodoParameters(todo.slug, {
                        title: todo.title,
                        description: value,
                      });
                    }}
                    textarea={true}
                  />
                </div>
              )}
            </div>
            <div className="todo_main_footer">
              {getCurrentMonth(todo.createdAt)} {getCurrentDay(todo.createdAt)},{" "}
              {getTime(todo.createdAt)}
            </div>
          </>
        ) : (
          <div className="empty-list-message">Create a task to edit</div>
        )}
      </div>
    </div>
  );
};

export default Main;
