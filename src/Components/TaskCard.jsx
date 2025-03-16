import React from "react";

const TaskCard = ({ task }) => {
  if (!task) {
    return (
      <div className="rounded-md border border-gray-200 p-4 shadow-sm">
        Loading task...
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ka-GE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const truncateDescription = (text, maxLength = 100) => {
    if (!text) {
      return "";
    }
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <div className="rounded-md border border-gray-200 p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">
            {task.priority?.name || "No priority"}
          </span>
          <span className="text-sm text-gray-600">
            {task.department?.name || "No department"}
          </span>
        </div>
        <span className="text-sm text-gray-500">
          {task.due_date ? formatDate(task.due_date) : "No due date"}
        </span>
      </div>

      <div className="mb-2">
        <h3 className="text-lg font-bold">{task.name || "Untitled Task"}</h3>
      </div>

      <div className="mb-3">
        <p className="text-sm text-gray-700">
          {truncateDescription(task.description) || "No description"}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div>
          {task.employee?.avatar && (
            <img
              src={task.employee.avatar}
              alt={`${task.employee?.name || ""} ${task.employee?.surname || ""}`}
              className="h-8 w-8 rounded-full"
            />
          )}
        </div>
        <div className="flex items-center gap-1">
          <svg
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm">{task.total_comments || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
