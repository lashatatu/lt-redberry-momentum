// src/Components/DropdownContent.jsx
import React from "react";

const DropdownContent = ({
  filterId,
  items = [],
  isLoading,
  error,
  selectedItems,
  toggleSelection,
  handleSelection,
  emptyMessage,
  itemLabelField = "name",
}) => {
  return (
    <div
      className={
        "border-primary absolute top-full left-0 z-10 mt-2 w-full rounded-md border bg-white shadow-lg"
      }
    >
      <div className={"py-1"}>
        {isLoading ? (
          <div className={"px-4 py-2 text-center"}>იტვირთება...</div>
        ) : error ? (
          <div className={"px-4 py-2 text-center text-red-500"}>
            შეცდომა: {error.message}
          </div>
        ) : items.length === 0 ? (
          <div className={"px-4 py-2 text-center"}>{emptyMessage}</div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className={
                "flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
              }
              onClick={() => toggleSelection(filterId, item[itemLabelField])}
            >
              <div
                className={`mr-2 flex h-4 w-4 items-center justify-center rounded border ${
                  selectedItems[filterId].includes(item[itemLabelField])
                    ? "border-[#8239EC] bg-[#8239EC]"
                    : "border-gray-400"
                }`}
              >
                {selectedItems[filterId].includes(item[itemLabelField]) && (
                  <svg
                    className="h-3 w-3 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-700">
                {item[itemLabelField]}
              </span>
            </div>
          ))
        )}
        <div className={"flex justify-end px-4 py-2"}>
          <button
            onClick={() => handleSelection(filterId)}
            className={
              "w-32 rounded bg-[#8239EC] px-4 py-2 text-white hover:bg-[#6a2ec7]"
            }
          >
            არჩევა
          </button>
        </div>
      </div>
    </div>
  );
};

export default DropdownContent;
