import React from "react";
import { useStatusesQuery, useTasksQuery } from "../api/queries.js";
import TaskCard from "./TaskCard.jsx";

const taskColors = [
  {
    id: 1,
    color: "#F7BC30",
  },
  {
    id: 2,
    color: "#FB5607",
  },
  {
    id: 3,
    color: "#FF006E",
  },
  {
    id: 4,
    color: "#3A86FF",
  },
];

const TaskList = () => {
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
        <div className="flex justify-between pt-8">
          {statuses.map((status, index) => {
            const colorObj = taskColors[index % taskColors.length];
            return (
              <div
                key={status.id}
                className="w-[381px] rounded-md border border-gray-200 py-1.5"
                style={{ backgroundColor: colorObj.color }}
              >
                <h3 className="px-2 text-center text-xl font-extrabold text-white">
                  {status.name}
                </h3>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {!isTasksLoading && tasks && tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <div>No tasks found</div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
