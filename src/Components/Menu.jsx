import React from "react";
import { useState } from "react";
import {
  useDepartmentsQuery,
  useEmployeesQuery,
  usePrioritiesQuery,
} from "../api/queries.js";
import DropDownItemComponent from "./DropDownItemComponent.jsx";
import DropdownContent from "./DropDownFilterComponent.jsx";

const Menu = () => {
  const [openDropdowns, setOpenDropdowns] = useState({
    filter1: false,
    filter2: false,
    filter3: false,
  });

  const [selectedItems, setSelectedItems] = useState({
    filter1: [],
    filter2: [],
    filter3: [],
  });
  const [showSelections, setShowSelections] = useState(false);

  const {
    data: departments = [],
    isLoading: isDepartmentsLoading,
    error: departmentsError,
  } = useDepartmentsQuery();

  const {
    data: priorities = [],
    isLoading: isPrioritiesLoading,
    error: prioritiesError,
  } = usePrioritiesQuery();
  const {
    data: employees = [],
    isLoading: isEmployeesLoading,
    error: employeesError,
  } = useEmployeesQuery();
  const toggleDropdown = (dropdown) => {
    setOpenDropdowns((prev) => {
      if (prev[dropdown]) {
        return {
          ...prev,
          [dropdown]: false,
        };
      }

      return {
        filter1: false,
        filter2: false,
        filter3: false,
        [dropdown]: true,
      };
    });
  };

  const toggleSelection = (dropdown, item) => {
    setSelectedItems((prev) => {
      const isSelected = prev[dropdown].includes(item);
      if (isSelected) {
        return {
          ...prev,
          [dropdown]: prev[dropdown].filter((i) => i !== item),
        };
      } else {
        return {
          ...prev,
          [dropdown]: [...prev[dropdown], item],
        };
      }
    });
  };

  const handleSelection = (dropdown) => {
    toggleDropdown(dropdown);
    setShowSelections(true);
  };

  const clearAllSelections = () => {
    setSelectedItems({
      filter1: [],
      filter2: [],
      filter3: [],
    });
    setShowSelections(false);
  };

  return (
    <div>
      <h1 className="font-firago my-3 py-3 text-[34px] font-semibold text-[#212529]">
        დავალებების გვერდი
      </h1>

      <div className="relative my-3 flex w-fit gap-[45px] rounded-lg border border-[#DEE2E6] pr-2">
        <DropDownItemComponent
          filterId={"filter1"}
          label={"დეპარტამენტი"}
          isOpen={openDropdowns.filter1}
          onToggle={toggleDropdown}
        />
        <DropDownItemComponent
          filterId={"filter2"}
          label={"პრიორიტეტი"}
          isOpen={openDropdowns.filter2}
          onToggle={toggleDropdown}
        />
        <DropDownItemComponent
          filterId={"filter3"}
          label={"თანამშრომელი"}
          isOpen={openDropdowns.filter1}
          onToggle={toggleDropdown}
        />

        {openDropdowns.filter1 && (
          <DropdownContent
            filterId="filter1"
            items={departments}
            isLoading={isDepartmentsLoading}
            error={departmentsError}
            selectedItems={selectedItems}
            toggleSelection={toggleSelection}
            handleSelection={handleSelection}
            emptyMessage="დეპარტამენტები არ მოიძებნა"
          />
        )}

        {openDropdowns.filter2 && (
          <DropdownContent
            filterId="filter2"
            items={priorities}
            isLoading={isPrioritiesLoading}
            error={prioritiesError}
            selectedItems={selectedItems}
            toggleSelection={toggleSelection}
            handleSelection={handleSelection}
            emptyMessage="პრიორიტეტები არ მოიძებნა"
          />
        )}

        {openDropdowns.filter3 && (
          <DropdownContent
            filterId="filter3"
            items={employees}
            isLoading={isEmployeesLoading}
            error={employeesError}
            selectedItems={selectedItems}
            toggleSelection={toggleSelection}
            handleSelection={handleSelection}
            emptyMessage="თანამშრომლები არ მოიძებნა"
          />
        )}
      </div>

      <div className="my-3 flex flex-wrap gap-2">
        {showSelections &&
          Object.entries(selectedItems).map(([filter, items]) => {
            if (items.length === 0) {
              return null;
            }
            return items.map((item) => (
              <div
                key={`${filter}-${item}`}
                className="flex items-center rounded-full border border-[#CED4DA] px-3 py-1 text-sm text-[#343A40]"
              >
                {item}
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  onClick={() => toggleSelection(filter, item)}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ));
          })}
        {showSelections &&
          Object.values(selectedItems).some((items) => items.length > 0) && (
            <button
              onClick={clearAllSelections}
              className="ml-2 rounded-full px-3 py-1 text-sm"
            >
              <span>გასუფთავება</span>
            </button>
          )}
      </div>
    </div>
  );
};

export default Menu;
