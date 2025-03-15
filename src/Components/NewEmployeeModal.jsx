import React, { useState } from "react";
import cancelModal from "../public/cancelModal.png";
import removeEmployeeImage from "../public/removeEmployeeImage.png";
import imageLogo from "../public/imageLogo.png";
import SelectComponent from "./SelectComponent.jsx";
import { useDepartmentsQuery } from "../api/queries.js";
import { useCreateEmployeeMutation } from "../api/mutations.js";

const NewEmployeeModal = () => {
  const {
    data: departments = [],
    isLoading: isDepartmentsLoading,
    error: departmentsError,
  } = useDepartmentsQuery();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    department: "",
    avatar: null,
  });

  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    department: "",
    avatar: ""
  });

const validateField = (name, value) => {
  if (name === "department") {
    return value ? "" : "აუცილებელი ველი";
  }

  if (value.length < 2) {
    return "მინიმუმ 2 სიმბოლო";
  }
  if (value.length > 255) {
    return "მაქსიმუმ 255 სიმბოლო";
  }

  const pattern = /^[a-zA-Zა-ჰ]+$/;
  if (!pattern.test(value)) {
    return "მხოლოდ ქართული და ინგლისური ასოები";
  }
  return "";
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 600 * 1024) {
        setErrors(prev => ({
          ...prev,
          avatar: "ფაილის ზომა არ უნდა აღემატებოდეს 600KB-ს"
        }));
        return;
      }

      setErrors(prev => ({
        ...prev,
        avatar: ""
      }));

      setFormData(prev => ({
        ...prev,
        avatar: file
      }));
    }
  };

  const removeAvatar = () => {
    setFormData((prev) => ({
      ...prev,
      avatar: null,
    }));
  };

  const handleCloseModal = () => {
    document.getElementById("my_modal_7").checked = false;
    resetForm();
  };

  const createEmployeeMutation = useCreateEmployeeMutation();

  const resetForm = () => {
    setFormData({
      name: "",
      surname: "",
      department: "",
      avatar: null,
    });
    setErrors({
      name: "",
      surname: "",
      department: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameError = validateField("name", formData.name);
    const surnameError = validateField("surname", formData.surname);
    const departmentError = validateField("department", formData.department);

    if (nameError || surnameError || departmentError) {
      setErrors({
        name: nameError,
        surname: surnameError,
        department: departmentError,
      });
      return;
    }

    createEmployeeMutation.mutate(formData, {
      onSuccess: () => {
        handleCloseModal();
      },
      onError: (error) => {
        console.error("Error creating employee:", error);
      }
    });
  };


  return (
    <>
      <label htmlFor="my_modal_7" className={"hover:cursor-pointer "}>
        თანამშრომლის შექმნა
      </label>
      <input
        type="checkbox"
        id="my_modal_7"
        className="modal-toggle backdrop-blur-[2px]"
      />
      <div className="modal backdrop-blur-[2px]" role={"dialog"}>
        <div className={"modal-box w-11/12 max-w-5xl"}>
          <div className={"flex-row"}>
            <div className="modal-action">
              <label htmlFor="my_modal_7" onClick={resetForm}>
                <img
                  src={cancelModal}
                  alt=""
                  className="hover:cursor-pointer"
                />
              </label>
            </div>
            <h3 className={"text-center text-[32px] font-bold text-[#212529] pb-[60px]"}>
              თანამშრომლის დამატება
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="form-control w-full">
                  <label>
                    <span className="label-text font-bold">
                      სახელი<span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
                  />
                  <div className="mt-1 flex-row gap-2 text-[#6C757D]">
                    <div
                      className={` ${
                        formData.name.length > 0
                          ? errors.name
                            ? "text-error"
                            : "text-success"
                          : ""
                      }`}
                    >
                      √ მინიმუმ 2 სიმბოლო
                    </div>
                    <div
                      className={` ${
                        formData.name.length > 0
                          ? errors.name
                            ? "text-error"
                            : "text-success"
                          : ""
                      }`}
                    >
                      √ მაქსიმუმ 255 სიმბოლო
                    </div>
                  </div>
                </div>

                <div className="form-control w-full">
                  <label>
                    <span className="label-text font-bold">
                      გვარი<span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    className={`input input-bordered w-full ${errors.surname ? "input-error" : ""}`}
                  />
                  <div className="mt-1 flex-row gap-2 text-[#6C757D]">
                    <div
                      className={` ${
                        formData.surname.length > 0
                          ? errors.surname
                            ? "text-error"
                            : "text-success"
                          : ""
                      }`}
                    >
                      √ მინიმუმ 2 სიმბოლო
                    </div>
                    <div
                      className={` ${
                        formData.surname.length > 0
                          ? errors.surname
                            ? "text-error"
                            : "text-success"
                          : ""
                      }`}
                    >
                      √ მაქსიმუმ 255 სიმბოლო
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="form-control w-full">
                  <label>
                    <span className="label-text font-bold">
                      ავატარი<span className="text-error">*</span>
                    </span>
                  </label>
                  <div className="border-base-300 rounded-lg border-2 border-dashed p-8 text-center">
                    {formData.avatar ? (
                      <div className="relative inline-block">
                        <img
                          src={URL.createObjectURL(formData.avatar)}
                          alt="Avatar preview"
                          className="mx-auto h-24 w-24 rounded-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeAvatar}
                          className="btn btn-circle btn-sm absolute -right-2 -bottom-2"
                        >
                          <img src={removeEmployeeImage} alt="" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <label className={"flex flex-col items-center hover:cursor-pointer"}>
                          <img
                            src={imageLogo}
                            alt="Upload icon"
                            className="mb-2 h-[28px] w-[34px]"
                          />
                          <p className={"text-[14px]"}>ატვირთე ფოტო</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          {errors.avatar && (
                            <div className="text-error text-sm mt-1">{errors.avatar}</div>
                          )}
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-1/2">
                <SelectComponent
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  options={departments}
                  isLoading={isDepartmentsLoading}
                  error={departmentsError}
                  label="დეპარტამენტი"
                  required={true}
                  placeholder=""
                  errorMessage={errors.department}
                />
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn mr-2"
                  onClick={handleCloseModal}
                >
                  გაუქმება
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  დაამატე თანამშრომელი
                </button>
              </div>
            </form>
          </div>

          <div className="modal-backdrop">
            <button type="button" onClick={resetForm}>
              close
            </button>
          </div>
        </div>
        <label
          className="modal-backdrop"
          htmlFor="my_modal_7"
          onClick={resetForm}
        >
          Close
        </label>
      </div>
    </>
  );
};

export default NewEmployeeModal;
