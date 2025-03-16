import Header from "./Components/Header.jsx";
import Menu from "./Components/Menu.jsx";
import TaskList from "./Components/TaskList.jsx";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewTask from "./Components/NewTask.jsx";
import TaskCard from "./Components/TaskCard.jsx";
import TaskCardPage from "./Components/TaskCardPage.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className={"px-28 pt-7"}>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Menu />
                  <TaskList />
                </>
              }
            />
            <Route path="/new-task" element={<NewTask />} />
            <Route path="/tasks/:id" element={<TaskCardPage />} />

          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
