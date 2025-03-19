import React, { useState, useRef, useEffect } from "react";

const SelectComponent = ({
  name,
  value,
  onChange,
  options,
  label,
  required = false,
  placeholder,
  errorMessage,
  isPriority = false,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) => opt.id.toString() === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (optionId) => {
    const event = {
      target: {
        name,
        value: optionId.toString(),
      },
    };
    onChange(event);
    setIsOpen(false);
  };

  if (!isPriority && !options.some(opt => opt.icon)) {
    return (
      <>
        <label className="input__label">
          {label}
          {required && <span className="text-error">*</span>}
        </label>
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`rounded__border ${errorMessage ? "border-error" : ""} ${disabled ? "bg-gray-200" : ""}`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.id} value={option.id} className={option.isSpecial ? "font-bold text-blue-600" : ""}>
              {option.name}
            </option>
          ))}
        </select>
        {errorMessage && <div className="text__error">{errorMessage}</div>}
      </>
    );
  }

  return (
    <>
      <label className="input__label">
        {label}
        {required && <span className="text-error">*</span>}
      </label>
      <div ref={dropdownRef} className="relative">
        <div
          className={`rounded__border flex cursor-pointer items-center justify-between px-3 py-2 ${
            errorMessage ? "border-error" : ""
          } ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            {value ? (
              <>
                {selectedOption?.icon && (
                  <img
                    src={selectedOption.icon}
                    alt={selectedOption.name}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                )}
                <span>{selectedOption?.name}</span>
              </>
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </div>
          <svg
            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {isOpen && !disabled && (
          <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
            {options.map((option) => (
              <div
                key={option.id}
                className={`flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-gray-100 ${
                  option.isSpecial ? "font-bold text-blue-600" : ""
                }`}
                onClick={() => handleOptionClick(option.id)}
              >
                {option.icon && !option.isSpecial && (
                  <img
                    src={option.icon}
                    alt={option.name}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                )}
                <div></div>
                <span>{option.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {errorMessage && <div className="text__error">{errorMessage}</div>}
    </>
  );
};

export default SelectComponent;
