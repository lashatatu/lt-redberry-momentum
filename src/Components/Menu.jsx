import React from "react";
import { useState, useEffect } from "react";

const Menu = () => {
  const [departments, setDepartments] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showSelections, setShowSelections] = useState(false);

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

  const [isLoading, setIsLoading] = useState({
    departments: false,
    priorities: false,
    employees: false,
  });

  const [error, setError] = useState({
    departments: null,
    priorities: null,
    employees: null,
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      setIsLoading((prev) => ({
        ...prev,
        departments: true,
      }));
      setError((prev) => ({
        ...prev,
        departments: null,
      }));
      try {
        const response = await fetch(
          "https://momentum.redberryinternship.ge/api/departments",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }
        const data = await response.json();
        console.log("Department API response:", data);

        if (Array.isArray(data)) {
          setDepartments(data);
        } else if (data.data && Array.isArray(data.data)) {
          setDepartments(data.data);
        } else if (data.departments && Array.isArray(data.departments)) {
          setDepartments(data.departments);
        } else {
          console.error("Unexpected departments data structure:", data);
          setDepartments([]);
        }
      } catch (err) {
        setError((prev) => ({
          ...prev,
          departments: err.message,
        }));
        console.error("Error fetching departments:", err);
      } finally {
        setIsLoading((prev) => ({
          ...prev,
          departments: false,
        }));
      }
    };

    const fetchPriorities = async () => {
      setIsLoading((prev) => ({
        ...prev,
        priorities: true,
      }));
      setError((prev) => ({
        ...prev,
        priorities: null,
      }));
      try {
        const response = await fetch(
          "https://momentum.redberryinternship.ge/api/priorities",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch priorities");
        }
        const data = await response.json();
        console.log("Priority API response:", data);

        if (Array.isArray(data)) {
          setPriorities(data);
        } else if (data.data && Array.isArray(data.data)) {
          setPriorities(data.data);
        } else if (data.priorities && Array.isArray(data.priorities)) {
          setPriorities(data.priorities);
        } else {
          console.error("Unexpected priorities data structure:", data);
          setPriorities([]);
        }
      } catch (err) {
        setError((prev) => ({
          ...prev,
          priorities: err.message,
        }));
        console.error("Error fetching priorities:", err);
      } finally {
        setIsLoading((prev) => ({
          ...prev,
          priorities: false,
        }));
      }
    };

    const fetchEmployees = async () => {};

    fetchDepartments();
    fetchPriorities();
    fetchEmployees();
  }, []);

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
        <div className="relative">
          <button
            className="flex w-40 items-center justify-between rounded-md bg-white px-4 py-2"
            onClick={() => toggleDropdown("filter1")}
          >
            <span className={`${openDropdowns.filter1 ? "text-primary" : ""}`}>
              დეპარტამენტი
            </span>
            <span>
              <svg
                className={`h-4 w-4 ${openDropdowns.filter1 ? "text-primary" : ""}`}
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

        <div className="relative">
          <button
            className="flex w-40 items-center justify-between rounded-md bg-white px-4 py-2"
            onClick={() => toggleDropdown("filter2")}
          >
            <span className={`${openDropdowns.filter2 ? "text-primary" : ""}`}>
              პრიორიტეტი
            </span>

            <span>
              <svg
                className={`h-4 w-4 ${openDropdowns.filter2 ? "text-primary" : ""}`}
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

        <div className="relative">
          <button
            className="flex w-40 items-center justify-between rounded-md bg-white px-4 py-2"
            onClick={() => toggleDropdown("filter3")}
          >
            <span className={`${openDropdowns.filter3 ? "text-primary" : ""}`}>
              თანამშრომელი
            </span>
            <span>
              <svg
                className={`h-4 w-4 ${openDropdowns.filter3 ? "text-primary" : ""}`}
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
        {openDropdowns.filter1 && (
          <div className="border-primary absolute top-full left-0 z-10 mt-2 w-full rounded-md border bg-white shadow-lg">
            <div className="py-1">
              {isLoading.departments ? (
                <div className="px-4 py-2 text-center">იტვირთება...</div>
              ) : error.departments ? (
                <div className="px-4 py-2 text-center text-red-500">
                  შეცდომა: {error.departments}
                </div>
              ) : departments.length === 0 ? (
                <div className="px-4 py-2 text-center">
                  დეპარტამენტები არ მოიძებნა
                </div>
              ) : (
                departments.map((department) => (
                  <div
                    key={department.id}
                    className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
                    onClick={() => toggleSelection("filter1", department.name)}
                  >
                    <div
                      className={`mr-2 flex h-4 w-4 items-center justify-center rounded border ${
                        selectedItems.filter1.includes(department.name)
                          ? "border-[#8239EC] bg-[#8239EC]"
                          : "border-gray-400"
                      }`}
                    >
                      {selectedItems.filter1.includes(department.name) && (
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
                      {department.name}
                    </span>
                  </div>
                ))
              )}
              <div className="flex justify-end px-4 py-2">
                <button
                  onClick={() => handleSelection("filter1")}
                  className="w-32 rounded bg-[#8239EC] px-4 py-2 text-white hover:bg-[#6a2ec7]"
                >
                  არჩევა
                </button>
              </div>
            </div>
          </div>
        )}

        {openDropdowns.filter2 && (
          <div className="border-primary absolute top-full left-0 z-10 mt-2 w-full rounded-md border bg-white shadow-lg">
            <div className="py-1">
              {isLoading.priorities ? (
                <div className="px-4 py-2 text-center">იტვირთება...</div>
              ) : error.priorities ? (
                <div className="px-4 py-2 text-center text-red-500">
                  შეცდომა: {error.priorities}
                </div>
              ) : priorities.length === 0 ? (
                <div className="px-4 py-2 text-center">
                  პრიორიტეტები არ მოიძებნა
                </div>
              ) : (
                priorities.map((priority) => (
                  <div
                    key={priority.id}
                    className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
                    onClick={() => toggleSelection("filter2", priority.name)}
                  >
                    <div
                      className={`mr-2 flex h-4 w-4 items-center justify-center rounded border ${
                        selectedItems.filter2.includes(priority.name)
                          ? "border-[#8239EC] bg-[#8239EC]"
                          : "border-gray-400"
                      }`}
                    >
                      {selectedItems.filter2.includes(priority.name) && (
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
                      {priority.name}
                    </span>
                  </div>
                ))
              )}
              <div className="flex justify-end px-4 py-2">
                <button
                  onClick={() => handleSelection("filter2")}
                  className="w-32 rounded bg-[#8239EC] px-4 py-2 text-white hover:bg-[#6a2ec7]"
                >
                  არჩევა
                </button>
              </div>
            </div>
          </div>
        )}

        {openDropdowns.filter3 && (
          <div className="border-primary absolute top-full left-0 z-10 mt-2 w-full rounded-md border bg-white shadow-lg">
            <div className="py-1">
              {isLoading.employees ? (
                <div className="px-4 py-2 text-center">იტვირთება...</div>
              ) : error.employees ? (
                <div className="px-4 py-2 text-center text-red-500">
                  შეცდომა: {error.employees}
                </div>
              ) : employees.length === 0 ? (
                <div className="px-4 py-2 text-center">
                  თანამშრომლები არ მოიძებნა
                </div>
              ) : (
                employees.map((employee) => (
                  <div
                    key={employee.id}
                    className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
                    onClick={() => toggleSelection("filter3", employee.name)}
                  >
                    <div
                      className={`mr-2 flex h-4 w-4 items-center justify-center rounded border ${
                        selectedItems.filter3.includes(employee.name)
                          ? "border-[#8239EC] bg-[#8239EC]"
                          : "border-gray-400"
                      }`}
                    >
                      {selectedItems.filter3.includes(employee.name) && (
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
                      {employee.name}
                    </span>
                  </div>
                ))
              )}
              <div className="flex justify-end px-4 py-2">
                <button
                  onClick={() => handleSelection("filter3")}
                  className="w-32 rounded bg-[#8239EC] px-4 py-2 text-white hover:bg-[#6a2ec7]"
                >
                  არჩევა
                </button>
              </div>
            </div>
          </div>
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
