import { useState, useEffect } from "react";

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

  const [departments, setDepartments] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [employees, setEmployees] = useState([]);

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
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
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
  };

  return (
    <div>
      <h1 className="font-firago my-3 py-3 text-[34px] font-semibold text-[#212529]">
        დავალებების გვერდი
      </h1>

      <div className="relative my-3 flex w-fit gap-[45px] rounded-lg border border-gray-300">
        <div className="relative">
          <button
            className="flex w-40 items-center justify-between rounded-md bg-white px-4 py-2"
            onClick={() => toggleDropdown("filter1")}
          >
            <span>
              დეპარტამენტი{" "}
              {selectedItems.filter1.length > 0 &&
                `(${selectedItems.filter1.length})`}
            </span>
            <svg
              className={`h-4 w-4 transition-transform ${openDropdowns.filter1 ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="relative">
          <button
            className="flex w-40 items-center justify-between rounded-md bg-white px-4 py-2"
            onClick={() => toggleDropdown("filter2")}
          >
            <span>
              პრიორიტეტი{" "}
              {selectedItems.filter2.length > 0 &&
                `(${selectedItems.filter2.length})`}
            </span>
            <svg
              className={`h-4 w-4 transition-transform ${openDropdowns.filter2 ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="relative">
          <button
            className="flex w-40 items-center justify-between rounded-md bg-white px-4 py-2"
            onClick={() => toggleDropdown("filter3")}
          >
            <span>
              თანამშრომელი{" "}
              {selectedItems.filter3.length > 0 &&
                `(${selectedItems.filter3.length})`}
            </span>
            <svg
              className={`h-4 w-4 transition-transform ${openDropdowns.filter3 ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {openDropdowns.filter1 && (
          <div className="absolute left-0 top-full z-10 mt-2 w-full rounded-md border border-gray-300 bg-white shadow-lg">
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
              <div className="flex justify-end border-t border-gray-200 px-4 py-2">
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
          <div className="absolute left-0 top-full z-10 mt-2 w-full rounded-md border border-gray-300 bg-white shadow-lg">
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
              <div className="flex justify-end border-t border-gray-200 px-4 py-2">
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
          <div className="absolute left-0 top-full z-10 mt-2 w-full rounded-md border border-gray-300 bg-white shadow-lg">
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
              <div className="flex justify-end border-t border-gray-200 px-4 py-2">
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
    </div>
  );
};

export default Menu;
