import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useTaskQuery,
  useStatusesQuery,
  useTaskCommentsQuery,
} from "../api/queries";
import {
  useAddCommentMutation,
  useUpdateTaskStatusMutation,
} from "../api/mutations";
import { format } from "date-fns";
import { ka } from "date-fns/locale";
import pieChart from "../public/pieChartIcon.png";
import userIcon from "../public/userIcon.png";
import calendarIcon from "../public/calendarIcon.png";
import SelectComponent from "./SelectComponent.jsx";

const TaskCardPage = () => {
  const { id } = useParams();
  const { data: task, isLoading, error } = useTaskQuery(id);
  const {
    data: statuses,
    isLoading: isStatusesLoading,
    error: statusesError,
  } = useStatusesQuery();
  const {
    data: comments,
    isLoading: isCommentsLoading,
    error: commentsError,
  } = useTaskCommentsQuery(id);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const addCommentMutation = useAddCommentMutation();
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
      statusId: value,
    });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      return;
    }

    addCommentMutation.mutate(
      {
        taskId: id,
        text: commentText,
      },
      {
        onSuccess: () => {
          setCommentText("");
        },
      },
    );
  };

  const handleReplyClick = (commentId) => {
    setReplyingTo(commentId);
    setReplyText("");
  };

  const handleAddReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) {
      return;
    }

    addCommentMutation.mutate(
      {
        taskId: id,
        text: replyText,
        parent_id: replyingTo,
      },
      {
        onSuccess: () => {
          setReplyText("");
          setReplyingTo(null);
        },
      },
    );
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
    <div className="flex flex-row gap-72 px-4">
      <div className={"my-6 w-2/5"}>
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
                  isLoading={
                    isStatusesLoading || updateTaskStatusMutation.isLoading
                  }
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
                  ? format(new Date(task.due_date), "eee - MM/dd/yyyy", {
                      locale: ka,
                    })
                  : "თარიღი არ არის მითითებული"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-6 w-2/5 rounded-lg border border-[#DDD2FF] bg-[#F8F3FEA6] p-4">
        {isCommentsLoading && <p>Loading comments...</p>}

        {commentsError && (
          <p className="text-red-500">
            Error loading comments: {commentsError.message}
          </p>
        )}

        <form onSubmit={handleAddComment} className="mb-6">
          <div className="focus:ring-primary relative mb-4 rounded-lg bg-white pr-2 pb-2 focus:ring-2">
            <textarea
              className="min-h-[100px] w-full resize-none rounded-lg p-3 focus:outline-none"
              placeholder="დაწერე კომენტარი"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-primary hover:bg-opacity-90 rounded-4xl px-4 py-2 text-white transition-colors disabled:opacity-50"
                disabled={!commentText.trim() || addCommentMutation.isLoading}
              >
                დააკომენტარე
              </button>
            </div>
          </div>
        </form>

        <div className="mb-4 flex items-center">
          <span className="font-medium">კომენტარები</span>
          <span className="bg-primary ml-2 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white">
            {comments?.reduce(
              (total, comment) => total + 1 + comment.sub_comments?.length,
              0,
            )}
          </span>
        </div>

        {comments && comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="pb-4">
                <div className="mb-2 flex gap-2">
                  <img
                    src={comment.author_avatar || userIcon}
                    alt=""
                    className="h-8 w-8 shrink-0 rounded-full"
                  />
                  <div className="w-full">
                    <div className="font-semibold">
                      {comment.author_nickname}
                    </div>
                    <div className="text-xs text-gray-500">
                      {comment.created_at &&
                        format(
                          new Date(comment.created_at),
                          "MMM d, yyyy HH:mm",
                          { locale: ka },
                        )}
                    </div>
                    <p className="mt-1 text-gray-700">{comment.text}</p>

                    <div className="mt-2 flex justify-start">
                      <button
                        onClick={() => handleReplyClick(comment.id)}
                        className="text-primary flex cursor-pointer items-center gap-1 text-sm hover:underline"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_8958_352)">
                            <path
                              d="M16.0007 13.9993H14.6673V11.9993C14.6673 8.66602 12.0007 5.99935 8.66732 5.99935H5.33398V4.66602H8.66732C12.734 4.66602 16.0007 7.93268 16.0007 11.9993V13.9993Z"
                              fill="#8338EC"
                            />
                            <path
                              d="M2 5.33333L5.33333 8.66667V2L2 5.33333Z"
                              fill="#8338EC"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_8958_352">
                              <rect width="16" height="16" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <span>უპასუხე</span>
                      </button>
                    </div>

                    {replyingTo === comment.id && (
                      <div className="border-primary mt-4 ml-8 border-l-2 pl-4">
                        <form onSubmit={handleAddReply}>
                          <div className="focus:ring-primary relative mb-4 rounded-lg bg-white pr-2 pb-2 focus:ring-2">
                            <textarea
                              className="min-h-[100px] w-full resize-none rounded-lg p-3 focus:outline-none"
                              placeholder="უპასუხე კომენტარს"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                type="submit"
                                className="bg-primary hover:bg-opacity-90 rounded-4xl px-4 py-2 text-white transition-colors disabled:opacity-50"
                                disabled={
                                  !replyText.trim() ||
                                  addCommentMutation.isLoading
                                }
                              >
                                პასუხი
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}

                    {comment.sub_comments &&
                      comment.sub_comments.length > 0 && (
                        <div className="mt-3">
                          {comment.sub_comments.map((reply) => (
                            <div key={reply.id} className="mt-3 ml-8">
                              <div className="flex gap-2">
                                <img
                                  src={reply.author_avatar || userIcon}
                                  alt=""
                                  className="h-6 w-6 shrink-0 rounded-full"
                                />
                                <div>
                                  <div className="text-sm font-semibold">
                                    {reply.author_nickname}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {reply.created_at &&
                                      format(
                                        new Date(reply.created_at),
                                        "MMM d, yyyy HH:mm",
                                        { locale: ka },
                                      )}
                                  </div>
                                  <p className="mt-1 text-sm text-gray-700">
                                    {reply.text}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">ამ დავალებას კომენტარები არ აქვს</p>
        )}
      </div>
    </div>
  );
};

export default TaskCardPage;
