import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ka } from "date-fns/locale";

const TaskCard = ({ task }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/tasks/${task.id}`);
  };

  if (!task) {
    return (
      <div className="rounded-md border border-gray-200 p-4 shadow-sm">
        Loading task...
      </div>
    );
  }

  const truncateDescription = (text, maxLength) => {
    if (!text) {
      return "";
    }

    return text.length <= 100
      ? text.slice(0, maxLength)
      : text.length > maxLength
        ? `${text.slice(0, maxLength)}...`
        : text;
  };

  return (
    <div
      className={`cursor-pointer rounded-[15px] border ${
        task.status?.name === "დასაწყები"
          ? "border-[#F7BC30]"
          : task.status?.name === "პროგრესში"
            ? "border-[#FB5607]"
            : task.status?.name === "მზად ტესტირებისთვის"
              ? "border-[#FF006E]"
              : task.status?.name === "დასრულებული"
                ? "border-[#3A86FF]"
                : ""
      } h-[200px] flex-col justify-between p-2`}
      onClick={handleCardClick}
    >
      <div className="flex items-center justify-between text-[12px]">
        <div className={"flex gap-[10px]"}>
          <div
            className={`flex items-center rounded-[4px] border p-[4px] font-semibold ${
              task.priority?.name === "დაბალი"
                ? "text-[#08A508]"
                : task.priority?.name === "საშუალო"
                  ? "text-[#FFBE0B]"
                  : task.priority?.name === "მაღალი"
                    ? "text-[#FA4D4D]"
                    : ""
            }`}
          >
            <img
              src={task.priority?.icon}
              alt=""
              className={"w-[16px h-[18px]"}
            />
            <span>{task.priority?.name}</span>
          </div>
          <div
            className={`rounded-[15px] p-[4px] text-white ${
              task.department?.name === "ადმინისტრაციის დეპარტამენტი"
                ? "bg-[#FF66A8]"
                : task.department?.name === "ადამიანური რესურსების დეპარტამენტი"
                  ? "bg-gray-400"
                  : task.department?.name === "ფინანსების დეპარტამენტი"
                    ? "bg-green-900"
                    : task.department?.name ===
                        "გაყიდვები და მარკეტინგის დეპარტამენტი"
                      ? "bg-[#FD9A6A]"
                      : task.department?.name === "ლოჯოსტიკის დეპარტამენტი"
                        ? "bg-[#89B6FF]"
                        : task.department?.name === "ტექნოლოგიების დეპარტამენტი"
                          ? "bg-[#FFD86D]"
                          : task.department?.name === "მედიის დეპარტამენტი"
                            ? "bg-accent"
                            : ""
            }`}
          >
            {truncateDescription(task.department?.name, 10)}
          </div>
        </div>
        <span className="text-gray-500">
          {task.due_date
            ? format(new Date(task.due_date), "dd MMM, yyyy", {
                locale: ka,
              })
            : "თარიღი არ არის მითითებული"}
        </span>
      </div>
      <div className={"flex gap-[12px]"}>
        <div className={"px-10"}>
          <div className="mb-2">
            <h3 className="text-lg font-bold">
              {task.name || "Untitled Task"}
            </h3>
          </div>

          <div className="mb-3">
            <p className="text-sm text-gray-700">
              {truncateDescription(task.description, 100)}
            </p>
          </div>
        </div>
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
