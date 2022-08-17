import React from "react";
import AdaptiveProvider from "./AdaptiveProvider";
import PathProvider from "./PathContext";
import TodosProvider from "./TodosContext";

interface Props {
  children?: React.ReactNode;
}

const ContextProvider = ({ children }: Props) => {
  return (
    <TodosProvider>
      <PathProvider>
        <AdaptiveProvider>{children}</AdaptiveProvider>
      </PathProvider>
    </TodosProvider>
  );
};

export default ContextProvider;
