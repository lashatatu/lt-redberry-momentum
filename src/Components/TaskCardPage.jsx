import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTaskQuery, useStatusesQuery } from "../api/queries";
import { useUpdateTaskStatusMutation } from "../api/mutations";
import { format } from "date-fns";
import { ka } from "date-fns/locale";
import pieChart from "../public/pieChartIcon.png";
import userIcon from "../public/userIcon.png";
import calendarIcon from "../public/calendarIcon.png";
import SelectComponent from "./SelectComponent.jsx";

const TaskCardPage = () => {
  const { id } = useParams();
  const { data: task, isLoading, error } = useTaskQuery(id);
  const { data: statuses, isLoading: isStatusesLoading, error: statusesError } = useStatusesQuery();
  const [selectedStatus, setSelectedStatus] = useState(null);
  const updateTaskStatusMutation = useUpdateTaskStatusMutation();
  useEffect(() => {
    if (task && task.status) {
      setSelectedStatus(task.status.id);
    }
  }, [task]);

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setSelectedStatus(value);
    updateTaskStatusMutation.mutate({
      taskId: id,
      statusId: value
    });
  };

  // დაბალი #08A508
  // საშუალო #FFBE0B
  // მაღალი #FA4D4D
  if (isLoading) {
    return <div>Loading task details...</div>;
  }
  if (error) {
    return <div>Error loading task: {error.message}</div>;
  }
  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className="flex justify-between">
      <div className={"my-6"}>
        {/*პრიორიტეტი დეპარტამენტი*/}
        <div className={"my-3 flex gap-4"}>
          <div
            className={`flex items-center gap-2 rounded border px-4 py-2 font-semibold ${
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
            className={`rounded-3xl px-4 py-2 text-white ${
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
            {task.department?.name}
          </div>
        </div>

        <div>
          <h1 className={"mb-10 text-3xl font-bold"}>{task.name}</h1>
          <p className={"mb-20 font-semibold"}>{task.description}</p>
        </div>
        <div>
          <h1 className={"my-1 pb-[30px] text-2xl font-semibold"}>
            დავალებების დეტალები
          </h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-6">
              <div className="flex h-10 items-center gap-2">
                <img src={pieChart} alt="" className="h-6 w-6" />
                <div className="font-semibold text-gray-600">სტატუსი</div>
              </div>
              <div className="flex h-10 items-center gap-2">
                <img src={userIcon} alt="" className="h-6 w-6" />
                <div className="font-semibold text-gray-600">თანამშრომელი</div>
              </div>
              <div className="flex h-10 items-center gap-2">
                <img src={calendarIcon} alt="" className="h-6 w-6" />
                <div className="font-semibold text-gray-600">
                  დავალების ვადა
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex h-10 items-center">
                <SelectComponent
                  name="status"
                  value={selectedStatus || task.status?.id}
                  onChange={handleStatusChange}
                  options={statuses || []}
                  isLoading={isStatusesLoading || updateTaskStatusMutation.isLoading}
                  error={statusesError}
                  placeholder="აირჩიე სტატუსი"
                />
              </div>

              <div className="h-10">
                <div className="flex items-center gap-2">
                  <img
                    src={task.employee?.avatar}
                    alt=""
                    className="h-8 w-8 rounded-full"
                  />
                  <div>
                    <div className="text-sm text-gray-600">
                      {task.department?.name}
                    </div>
                    <div className="text-sm font-semibold">
                      {task.employee?.name || "tanamshromlis saxeli"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex h-10 items-center font-semibold">
                {task.due_date
                  ? format(new Date(task.due_date), "eee MM/dd/yyyy", {
                      locale: ka,
                    })
                  : "თარიღი არ არის მითითებული"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>comments</div>
    </div>
  );
};

export default TaskCardPage;
