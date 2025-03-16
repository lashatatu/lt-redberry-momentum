import React from "react";

const SelectComponent = ({
  name,
  value,
  onChange,
  options = [],
  isLoading,
  error,
  label,
  required = false,
  placeholder = "აირჩიეთ...",
  errorMessage,
  valueField = "id",
  labelField = "name",
  className = "select-bordered w-full",
  disabled = false,
}) => {
  return (
    <div className="form-control w-full">
      {label && (
        <label>
          <span className="label-text font-bold">
            {label}
            {required && <span className="text-error">*</span>}
          </span>
        </label>
      )}

      <select
        name={name}
        value={value || ""}
        onChange={onChange}
        className={`border rounded mt-2 p-2 ${className} ${errorMessage ? "select-error" : ""}`}
        disabled={isLoading || disabled}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {isLoading ? (
          <option disabled>იტვირთება...</option>
        ) : error ? (
          <option disabled>შეცდომა მონაცემების ჩატვირთვისას</option>
        ) : (
          options?.map((option) => (
            <option key={option[valueField]} value={option[valueField]}>
              {option[labelField]}
            </option>
          ))
        )}
      </select>

      {errorMessage && (
        <label>
          <span className="label-text-alt text-error">{errorMessage}</span>
        </label>
      )}
    </div>
  );
};

export default SelectComponent;
