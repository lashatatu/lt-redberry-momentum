import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDepartmentsQuery,
  usePrioritiesQuery,
  useStatusesQuery,
  useEmployeesQuery,
} from "../api/queries";
import { useCreateTaskMutation } from "../api/mutations";
import { fieldValidations, validateRequiredField } from "../utilities/validations";

import SelectComponent from "./SelectComponent.jsx";
import NewEmployeeModal from "./NewEmployeeModal.jsx";

const NewTask = () => {
  const navigate = useNavigate();
  const { data: departments = [] } = useDepartmentsQuery();
  const { data: priorities = [] } = usePrioritiesQuery();
  const { data: statuses = [] } = useStatusesQuery();
  const {
    data: employees = [],
    isLoading: isEmployeesLoading,
    error: employeesError,
    refetch: refetchEmployees
  } = useEmployeesQuery();
  const createTaskMutation = useCreateTaskMutation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority_id: "",
    status_id: "",
    department_id: "",
    employee_id: "",
    deadline: getNextDayDate(),
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    priority_id: "",
    status_id: "",
    department_id: "",
    employee_id: "",
    deadline: "",
  });

  const [filteredEmployees, setFilteredEmployees] = useState([]);

  function getNextDayDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  }

  useEffect(() => {
    if (formData.department_id) {
      const filtered = employees.filter(
        (employee) =>
          employee.department?.id === parseInt(formData.department_id),
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees([]);
    }
  }, [formData.department_id, employees]);

  useEffect(() => {
    if (priorities.length > 0) {
      const mediumPriority = priorities.find(priority => priority.name === "საშუალო");
      if (mediumPriority) {
        setFormData(prev => ({
          ...prev,
          priority_id: mediumPriority.id.toString()
        }));
      }
    }
  }, [priorities]);

  useEffect(() => {
    if (document.getElementById("my_modal_7")?.checked === false) {
      refetchEmployees();
    }
  }, [document.getElementById("my_modal_7")?.checked]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (["title", "description"].includes(name)) {
      const hasError = fieldValidations[name]?.validate(value);
      setErrors(prev => ({
        ...prev,
        [name]: hasError,
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        [name]: validateRequiredField(value),
      }));
    }

    if (name === "department_id") {
      setFormData((prev) => ({
        ...prev,
        employee_id: "",
      }));
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    ["title", "description"].forEach(key => {
      newErrors[key] = fieldValidations[key].validate(formData[key]);
    });

    ["priority_id", "status_id", "department_id", "employee_id", "deadline"].forEach(key => {
      newErrors[key] = validateRequiredField(formData[key]);
    });

    setErrors(newErrors);


    const hasErrors = Object.entries(newErrors).some(([key, error]) => {
      if (key === "title" || key === "description") {
        return error === true;
      } else {
        return error !== "";
      }
    });

    if (hasErrors) {
      console.log("Validation errors:", newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const taskData = {
        name: formData.title,
        description: formData.description,
        priority_id: parseInt(formData.priority_id),
        status_id: parseInt(formData.status_id),
        department_id: parseInt(formData.department_id),
        employee_id: parseInt(formData.employee_id),
        due_date: formData.deadline
      };

      console.log("Sending task data:", taskData);
      await createTaskMutation.mutateAsync(taskData);

      setSubmitSuccess(true);

      setFormData({
        title: "",
        description: "",
        priority_id: "",
        status_id: "",
        department_id: "",
        employee_id: "",
        deadline: getNextDayDate(),
      });
      navigate('/');
      if (priorities?.data?.length > 0) {
        const mediumPriority = priorities.data.find(priority => priority.name === "საშუალო");
        if (mediumPriority) {
          setFormData(prev => ({
            ...prev,
            priority_id: mediumPriority.id.toString()
          }));
        }
      }
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-7">
      <h1 className={"text-[34px] font-semibold"}>შექმენი ახალი დავალება</h1>

      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-2 gap-40">
        <div>
          <div className="mb-4">
            <label className="mb-2 block font-medium">
              სათაური
              <span className="text-error">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className={`w-full rounded border p-2 ${errors.title ? "border-error" : ""}`}
            />
            <div className="mt-1 flex-row gap-2 text-[#6C757D]">
              <div
                className={`${
                  formData.title.length > 0
                    ? formData.title.length < 2
                      ? "text-error"
                      : "text-success"
                    : ""
                }`}
              >
                √ მინიმუმ 2 სიმბოლო
              </div>
              <div
                className={`${
                  formData.title.length > 0
                    ? formData.title.length > 255
                      ? "text-error"
                      : "text-success"
                    : ""
                }`}
              >
                √ მაქსიმუმ 255 სიმბოლო
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="mb-2 block font-medium">აღწერა</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`h-32 w-full rounded border p-2 ${errors.description ? "border-error" : ""}`}
            />
            {formData.description.length > 0 && (
              <div className="mt-1 flex-row gap-2 text-[#6C757D]">
                <div
                  className={`${
                    formData.description.length < 2
                      ? "text-error"
                      : "text-success"
                  }`}
                >
                  √ მინიმუმ 2 სიმბოლო
                </div>
                <div
                  className={`${
                    formData.description.length > 255
                      ? "text-error"
                      : "text-success"
                  }`}
                >
                  √ მაქსიმუმ 255 სიმბოლო
                </div>
              </div>
            )}
          </div>

          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <SelectComponent
                name="priority_id"
                value={formData.priority_id}
                onChange={handleChange}
                options={priorities}
                label="პრიორიტეტი"
                required={true}
                placeholder="აირჩიეთ პრიორიტეტი"
                errorMessage={errors.priority_id}
              />
            </div>

            <div className="flex-1">
              <SelectComponent
                name="status_id"
                value={formData.status_id}
                onChange={handleChange}
                options={statuses}
                label="სტატუსი"
                required={true}
                placeholder="აირჩიეთ სტატუსი"
                errorMessage={errors.status_id}
              />
            </div>
          </div>
        </div>

        <div className={"flex flex-col justify-between"}>
          <div>
            <div className="mb-4">
              <SelectComponent
                name="department_id"
                value={formData.department_id}
                onChange={handleChange}
                options={departments}
                label="დეპარტამენტი"
                required={true}
                placeholder="აირჩიეთ დეპარტამენტი"
                errorMessage={errors.department_id}
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block font-medium">
                პასუხისმგებელი თანამშრომელი
                <span className="text-error">*</span>
              </label>
              <select
                name="employee_id"
                value={formData.employee_id}
                onChange={(e) => {
                  if (e.target.value === "new") {
                    document.getElementById("my_modal_7").checked = true;
                  } else {
                    handleChange(e);
                  }
                }}
                required
                disabled={!formData.department_id}
                className={`w-full rounded border p-2 ${errors.employee_id ? "border-error" : ""} ${!formData.department_id ? "bg-gray-200" : ""}`}
              >
                <option value="">აირჩიეთ თანამშრომელი</option>
                <option value="new" className="font-bold text-blue-600">+ ახალი თანამშრომელი</option>
                {filteredEmployees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name} {employee.surname}
                  </option>
                ))}
              </select>
              {errors.employee_id && formData.department_id && (
                <div className="text-error mt-1 text-sm">
                  {errors.employee_id}
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="mb-2 block font-medium">
              დედლაინი
              <span className="text-error">*</span>
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              min={getNextDayDate()}
              onChange={handleChange}
              required
              className={`w-full rounded border p-2 ${errors.deadline ? "border-error" : ""}`}
            />
            {errors.deadline && (
              <div className="text-error mt-1 text-sm">{errors.deadline}</div>
            )}
          </div>
        </div>

        <div className="col-span-2 mt-4 flex justify-end">
          <button
            type="submit"
            className="cursor-pointer rounded bg-blue-600 px-6 py-2 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "იგზავნება..." : "შენახვა"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTask;
