import React from "react";
import AdaptiveProvider from "./AdaptiveProvider";
import PathProvider from "./PathContext";
import TodosProvider from "./TodosContext";

interface Props {
  children?: React.ReactNode;
}

// Компонент, который рендерит все провайдеры контекстов
const ContextProvider = ({ children }: Props) => {
  return (
    <PathProvider>
      <TodosProvider>
        <AdaptiveProvider>{children}</AdaptiveProvider>
      </TodosProvider>
    </PathProvider>
  );
};

export default ContextProvider;
