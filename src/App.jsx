import Header from "./Components/Header.jsx";
import Menu from "./Components/Menu.jsx";
import TaskList from "./Components/TaskList.jsx";
import React from "react";

function App() {
  return (
    <>
      <div className={'px-28 pt-7'}>
        <Header />
        <Menu/>
        <TaskList/>
      </div>
    </>
  );
}

export default App;
