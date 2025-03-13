import React from "react";

const DropDownItemComponent = ({
  filterId,
  label,
  isOpen,
  onToggle
}) => {
  return (
    <div className="relative">
      <button
        className="flex w-40 items-center justify-between rounded-md bg-white px-4 py-2"
        onClick={() => onToggle(filterId)}
      >
        <span className={`${isOpen ? "text-primary" : ""}`}>
          {label}
        </span>
        <span>
          <svg
            className={`h-4 w-4 ${isOpen ? "text-primary" : ""}`}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M6.70711 8.29289C6.31658 7.90237 5.68342 7.90237 5.29289 8.29289C4.90237 8.68342 4.90237 9.31658 5.29289 9.70711L11.2929 15.7071C11.6834 16.0976 12.3166 16.0976 12.7071 15.7071L18.7071 9.70711C19.0976 9.31658 19.0976 8.68342 18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289L12 13.5858L6.70711 8.29289Z"
              fill="primary"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};


export default DropDownItemComponent;
