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
          <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.08086 0.259766C1.87258 0.259766 0.880859 1.25148 0.880859 2.45977V13.0198C0.880859 14.228 1.87258 15.2198 3.08086 15.2198H4.88211C4.94227 15.7491 4.93539 16.239 4.79961 16.6498C4.63289 17.1551 4.3218 17.5796 3.74086 17.9285C3.57758 18.0316 3.50195 18.2293 3.5518 18.4149C3.60164 18.6005 3.76836 18.7329 3.96086 18.7398C5.82742 18.7398 7.96727 17.7652 9.04836 15.2198H18.9209C20.1291 15.2198 21.1209 14.228 21.1209 13.0198V2.45977C21.1209 1.25148 20.1291 0.259766 18.9209 0.259766H3.08086ZM3.08086 1.13977H18.9209C19.6496 1.13977 20.2409 1.73102 20.2409 2.45977V13.0198C20.2409 13.7485 19.6496 14.3398 18.9209 14.3398H8.80086C8.61695 14.3398 8.45195 14.4549 8.38836 14.6285C7.7043 16.4951 6.48227 17.3837 5.21211 17.7085C5.38398 17.4627 5.54727 17.2032 5.63836 16.9248C5.86695 16.2304 5.84805 15.4707 5.70711 14.6973C5.66758 14.4927 5.49055 14.3432 5.28086 14.3398H3.08086C2.35211 14.3398 1.76086 13.7485 1.76086 13.0198V2.45977C1.76086 1.73102 2.35211 1.13977 3.08086 1.13977Z" fill="#212529"/>
          </svg>
          <span className="text-sm">{task.total_comments || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
