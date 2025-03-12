import React, { useState } from "react";
import cancelModal from "../public/cancelModal.png";

const NewEmployeeModal = () => {
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
  });

  const validateField = (name, value) => {
    if (value.length < 2) {
      return "მინიმუმ 2 სიმბოლო";
    }
    if (value.length > 255) {
      return "მაქსიმუმ 255 სიმბოლო";
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
      setFormData((prev) => ({
        ...prev,
        avatar: e.target.files[0],
      }));
    }
  };

  const removeAvatar = () => {
    setFormData((prev) => ({
      ...prev,
      avatar: null,
    }));
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

    // Handle form submission
    console.log("Form submitted:", formData);
  };
  return (
    <>
      <label htmlFor="my_modal_7" className={"hover:cursor-pointer"}>
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
              <label htmlFor="my_modal_7">
                <img
                  src={cancelModal}
                  alt=""
                  className="hover:cursor-pointer"
                />
              </label>
            </div>
            <h3 className={"text-center text-[32px] font-bold"}>
              თანამშრომლის დამატება
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">
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
                  <div className="mt-1 flex-row gap-2">
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
                  <label className="label">
                    <span className="label-text">
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
                  <div className="mt-1 flex-row gap-2">
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
                  <label className="label">
                    <span className="label-text">
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
                          className="btn btn-circle btn-sm btn-error absolute -top-2 -right-2"
                        >
                          <img src={cancelModal} alt='' />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="file-input file-input-bordered w-full max-w-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-1/2">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">
                      დეპარტამენტი<span className="text-error">*</span>
                    </span>
                  </label>
                </div>
              </div>

              <div className="modal-action">
                <form method="dialog">
                  <button type="button" className="btn mr-2">
                    გაუქმება
                  </button>
                </form>
                <button type="submit" className="btn btn-primary">
                  დაამატე თანამშრომელი
                </button>
              </div>
            </form>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </>
  );
};

export default NewEmployeeModal;
