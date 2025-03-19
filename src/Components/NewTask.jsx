import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDepartmentsQuery,
  usePrioritiesQuery,
  useStatusesQuery,
  useEmployeesQuery,
} from "../api/queries";
import { useCreateTaskMutation } from "../api/mutations";
import {
  fieldValidations,
  validateRequiredField,
} from "../utilities/validations";
import SelectComponent from "./SelectComponent.jsx";
import DateInput from "./DateInput.jsx";

const STORAGE_KEY = "newTaskFormData";

const NewTask = () => {
  const navigate = useNavigate();
  const { data: departments = [] } = useDepartmentsQuery();
  const { data: priorities = [] } = usePrioritiesQuery();
  const { data: statuses = [] } = useStatusesQuery();
  const { data: employees = [], refetch: refetchEmployees } =
    useEmployeesQuery();
  const createTaskMutation = useCreateTaskMutation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData
      ? JSON.parse(savedData)
      : {
          title: "",
          description: "",
          priority_id: "",
          status_id: "",
          department_id: "",
          employee_id: "",
          deadline: getNextDayDate(),
        };
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
      const mediumPriority = priorities.find(
        (priority) => priority.name === "საშუალო",
      );
      if (mediumPriority) {
        setFormData((prev) => ({
          ...prev,
          priority_id: mediumPriority.id.toString(),
        }));
      }
    }
  }, [priorities]);

  useEffect(() => {
    if (document.getElementById("my_modal_7")?.checked === false) {
      refetchEmployees();
    }
  }, [document.getElementById("my_modal_7")?.checked]);

  const countWords = (text) => {
    if (!text || text.trim() === "") {
      return 0;
    }
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "description") {
      const words = countWords(value);
      setWordCount(words);

      setErrors((prev) => ({
        ...prev,
        [name]: value.trim() !== "" && words < 4,
      }));
    } else if (name === "title") {
      const hasError = fieldValidations[name]?.validate(value);
      setErrors((prev) => ({
        ...prev,
        [name]: hasError,
      }));
    } else {
      setErrors((prev) => ({
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

    newErrors.title = fieldValidations.title.validate(formData.title);
    const descriptionWords = countWords(formData.description);
    newErrors.description =
      formData.description.trim() !== "" && descriptionWords < 4;

    [
      "priority_id",
      "status_id",
      "department_id",
      "employee_id",
      "deadline",
    ].forEach((key) => {
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
        due_date: formData.deadline,
      };

      await createTaskMutation.mutateAsync(taskData);

      localStorage.removeItem(STORAGE_KEY);

      setFormData({
        title: "",
        description: "",
        priority_id: "",
        status_id: "",
        department_id: "",
        employee_id: "",
        deadline: getNextDayDate(),
      });

      navigate("/");
      if (priorities?.data?.length > 0) {
        const mediumPriority = priorities.data.find(
          (priority) => priority.name === "საშუალო",
        );
        if (mediumPriority) {
          setFormData((prev) => ({
            ...prev,
            priority_id: mediumPriority.id.toString(),
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
            <label className="input__label">
              სათაური
              <span className="text-error">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className={`rounded__border ${errors.title ? "border-error" : ""}`}
            />
            <div className="validation__wrapper">
              <div
                className={`${
                  formData.title.length > 0
                    ? formData.title.length < 3
                      ? "text-error"
                      : "text-success"
                    : ""
                }`}
              >
                √ მინიმუმ 3 სიმბოლო
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
            <label className="input__label">აღწერა</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`rounded__border h-32 ${errors.description ? "border-error" : ""}`}
            />
            {formData.description.length > 0 && (
              <div className="validation__wrapper">
                <div
                  className={`${wordCount < 4 ? "text-error" : "text-success"}`}
                >
                  √ მინიმუმ 4 სიტყვა (ამჟამად: {wordCount})
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
                isPriority={true}
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
              <SelectComponent
                name="employee_id"
                value={formData.employee_id}
                onChange={(e) => {
                  if (e.target.value === "new") {
                    document.getElementById("my_modal_7").checked = true;
                  } else {
                    handleChange(e);
                  }
                }}
                options={[
                  ...(formData.department_id
                    ? [
                        {
                          id: "new",
                          name: "+ ახალი თანამშრომელი",
                          isSpecial: true,
                        },
                      ]
                    : []),
                  ...filteredEmployees.map((emp) => ({
                    ...emp,
                    name: `${emp.name} ${emp.surname}`,
                    icon: emp.avatar,
                  })),
                ]}
                label="პასუხისმგებელი თანამშრომელი"
                required={true}
                placeholder="აირჩიეთ თანამშრომელი"
                errorMessage={errors.employee_id}
                disabled={!formData.department_id}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="w-full max-w-xs">
              <DateInput />
            </div>
{/*            <DateInput
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              min={getNextDayDate()}
              required={true}
              label="დედლაინი"
              errorMessage={errors.deadline}
            />*/}
          </div>
        </div>

        <div className="col-span-2 mt-4 flex justify-end">
          <button
            type="submit"
            className="bg-primary cursor-pointer rounded-md px-6 py-2 text-white"
            disabled={isSubmitting}
          >
            დავალების შენახვა
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTask;
