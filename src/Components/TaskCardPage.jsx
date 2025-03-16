import React from "react";
import { useParams } from "react-router-dom";
import { useTasksQuery } from "../api/queries"; // Update this import based on your API structure

const TaskCardPage = () => {
  const { id } = useParams();
  const { data: task, isLoading, error } = useTasksQuery(id);

  if (isLoading) return <div>Loading task details...</div>;
  if (error) return <div>Error loading task: {error.message}</div>;
  if (!task) return <div>Task not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{task.name}</h1>

      <div className="bg-white rounded-md shadow p-6">
        <div className="mb-4">
          <span className="text-gray-600">Priority:</span>
          <span className="ml-2 font-medium">{task.priority?.name || "None"}</span>
        </div>

        <div className="mb-4">
          <span className="text-gray-600">Department:</span>
          <span className="ml-2">{task.department?.name || "None"}</span>
        </div>

        <div className="mb-6">
          <span className="text-gray-600">Due Date:</span>
          <span className="ml-2">{task.due_date ? new Date(task.due_date).toLocaleDateString() : "No due date"}</span>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="whitespace-pre-wrap">{task.description || "No description provided."}</p>
        </div>

        <div className="mb-4">
          <span className="text-gray-600">Assigned To:</span>
          <span className="ml-2">
            {task.employee ? `${task.employee.name} ${task.employee.surname}` : "Unassigned"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCardPage;
