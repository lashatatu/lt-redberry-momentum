import Header from "./Components/Header.jsx";
import Menu from "./Components/Menu.jsx";
import TaskList from "./Components/TaskList.jsx";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={"px-28 pt-7"}>
        <Header />
        <Menu />
        <TaskList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
