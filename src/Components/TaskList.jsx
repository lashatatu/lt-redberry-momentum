import React from "react";
import { useStatusesQuery, useTasksQuery } from "../api/queries.js";
import TaskCard from "./TaskCard.jsx";
import { useFilters } from "../context/FilterContext";

const TaskList = () => {
  const { selectedItems } = useFilters();

  const {
    data: statuses = [],
    isLoading: isStatusesLoading,
    error: statusesError,
  } = useStatusesQuery();

  const {
    data: tasks = [],
    isLoading: isTasksLoading,
    error: tasksError,
  } = useTasksQuery();

  const isLoading = isStatusesLoading || isTasksLoading;
  const error = statusesError || tasksError;

  const filteredTasks = tasks.filter(task => {
    if (selectedItems.filter1.length > 0 &&
      (!task.department || !selectedItems.filter1.includes(task.department.name))) {
      return false;
    }

    if (selectedItems.filter2.length > 0 &&
      (!task.priority || !selectedItems.filter2.includes(task.priority.name))) {
      return false;
    }

    if (selectedItems.filter3.length > 0 &&
      (!task.employee || !selectedItems.filter3.includes(task.employee.name))) {
      return false;
    }

    return true;
  });

  const tasksByStatus = filteredTasks.reduce((acc, task) => {
    const statusId = task.status?.id;
    if (statusId) {
      if (!acc[statusId]) {
        acc[statusId] = [];
      }
      acc[statusId].push(task);
    }
    return acc;
  }, {});

  return (
    <div>
      {isLoading ? (
        <div className="py-4 text-center">იტვირთება...</div>
      ) : error ? (
        <div className="py-4 text-center text-red-500">
          შეცდომა: {error.message}
        </div>
      ) : statuses.length === 0 ? (
        <div className="py-4 text-center">სტატუსები არ მოიძებნა</div>
      ) : (
        <div className="flex gap-4">
          {statuses.map((status) => (
            <div key={status.id} className="flex w-[381px] flex-col">
              <div
                className={`mb-4 rounded-md border border-gray-200 py-1.5 ${
                  status.name === "დასაწყები"
                    ? "bg-[#F7BC30]"
                    : status.name === "პროგრესში"
                      ? "bg-[#FB5607]"
                      : status.name === "მზად ტესტირებისთვის"
                        ? "bg-[#FF006E]"
                        : status.name === "დასრულებული"
                          ? "bg-[#3A86FF]"
                          : ""
                }`}
              >
                <h3 className="px-2 text-center text-xl font-extrabold text-white">
                  {status.name}
                </h3>
              </div>

              <div className="flex flex-col gap-4">
                {tasksByStatus[status.id]?.map((task) => (
                  <TaskCard key={task.id} task={task} />
                )) || (
                  <div className="py-4 text-center text-gray-400">
                    ამ სტატუსში დავალებები არ არის
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
