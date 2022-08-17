import React, { useContext, useState } from "react";
import Main from "./components/Main";
import SideMenu from "./components/SideMenu";
import TodoItemStateIcon from "./components/TodoItemStateIcon";
import { AdaptiveContext } from "./contexts/AdaptiveProvider";
import { TodoItem } from "./types";

function App() {
  const { toggleSideBarOpen } = useContext(AdaptiveContext);
  return (
    <>
      <div className="app_container">
        <div className="open-burger" onClick={toggleSideBarOpen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </div>
        <SideMenu />
        <Main />
      </div>
      <footer>&copy; pahanprog 2022-2023</footer>
    </>
  );
}

export default App;
