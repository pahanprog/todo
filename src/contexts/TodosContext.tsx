import React, { createContext, useEffect, useRef, useState } from "react";
import { TodoItem, TodoItemPartial } from "../types";

export const TodosContext = createContext({} as TodosContextProps);

interface Props {
  children?: React.ReactNode;
}

interface TodosContextProps {
  todos: TodoItem[];
  addTodo: (todo: TodoItemPartial) => void;
  removeTodo: (slug: string) => void;
  updateTodoState: (slug: string) => void;
  changeTodoParameters: (slug: string, newParameters: TodoItemPartial) => void;
}

const TodosProvider = ({ children }: Props) => {
  const lastUsedId = useRef(0);
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      slug: "/test-todo" + lastUsedId.current,
      createdAt: new Date(),
      title: "test todo",
      complete: false,
      inProgress: false,
    },
  ]);

  const addTodo = (todo: TodoItemPartial) => {
    lastUsedId.current++;
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        slug:
          "/" +
          todo.title.toLocaleLowerCase().replace(" ", "-") +
          lastUsedId.current,
        createdAt: new Date(),
        title: todo.title,
        description: todo.description,
        complete: false,
        inProgress: false,
      },
    ]);
  };

  const removeTodo = (slug: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.slug !== slug));
  };

  const updateTodoState = (slug: string) => {
    const todoBasedOnSlug = todos.filter((todo) => todo.slug === slug)[0];

    if (todoBasedOnSlug) {
      if (!todoBasedOnSlug.inProgress && !todoBasedOnSlug.complete) {
        todoBasedOnSlug.inProgress = true;
      } else if (!todoBasedOnSlug.complete) {
        todoBasedOnSlug.inProgress = false;
        todoBasedOnSlug.complete = true;
      }
    }

    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.slug === slug) {
          return todoBasedOnSlug;
        } else {
          return todo;
        }
      })
    );
  };

  const changeTodoParameters = (
    slug: string,
    newParameters: TodoItemPartial
  ) => {
    const todoBasedOnSlug = todos.filter((todo) => todo.slug === slug)[0];

    if (todoBasedOnSlug) {
      todoBasedOnSlug.title = newParameters.title;
      todoBasedOnSlug.description = newParameters.description;
    }

    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.slug === slug) {
          return todoBasedOnSlug;
        } else {
          return todo;
        }
      })
    );
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        removeTodo,
        updateTodoState,
        changeTodoParameters,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;
