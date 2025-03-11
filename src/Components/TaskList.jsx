import { useState, useEffect } from "react";

const taskColors = [
  {
    id: 1,
    color: "#F7BC30",
  },
  {
    id: 2,
    color: "#FB5607",
  },
  {
    id: 3,
    color: "#FF006E",
  },
  {
    id: 4,
    color: "#3A86FF",
  },
];

const TaskList = () => {
  const [statuses, setStatuses] = useState([]);
  const [isLoading, setIsLoading] = useState({
    statuses: true,
  });
  const [error, setError] = useState({
    statuses: null,
  });

  useEffect(() => {
    const fetchStatuses = async () => {
      setIsLoading((prev) => ({
        ...prev,
        statuses: true,
      }));
      setError((prev) => ({
        ...prev,
        statuses: null,
      }));
      try {
        const response = await fetch(
          "https://momentum.redberryinternship.ge/api/statuses",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch statuses");
        }
        const data = await response.json();
        console.log("Status API response:", data);

        if (Array.isArray(data)) {
          setStatuses(data);
        } else if (data.data && Array.isArray(data.data)) {
          setStatuses(data.data);
        } else {
          console.error("Unexpected statuses data structure:", data);
          setStatuses([]);
        }
      } catch (err) {
        setError((prev) => ({
          ...prev,
          statuses: err.message,
        }));
        console.error("Error fetching statuses:", err);
      } finally {
        setIsLoading((prev) => ({
          ...prev,
          statuses: false,
        }));
      }
    };

    fetchStatuses();
  }, []);

  return (
    <div>
      {isLoading.statuses ? (
        <div className="py-4 text-center">იტვირთება...</div>
      ) : error.statuses ? (
        <div className="py-4 text-center text-red-500">
          შეცდომა: {error.statuses}
        </div>
      ) : statuses.length === 0 ? (
        <div className="py-4 text-center">სტატუსები არ მოიძებნა</div>
      ) : (
        <div className="flex justify-between pt-8">
          {statuses.map((status, index) => {
            const colorObj = taskColors[index % taskColors.length];
            return (
              <div
                key={status.id}
                className="w-[381px] rounded-md border border-gray-200 py-1.5"
                style={{ backgroundColor: colorObj.color }}
              >
                <h3 className="px-2 text-center text-xl font-extrabold text-white">
                  {status.name}
                </h3>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TaskList;
