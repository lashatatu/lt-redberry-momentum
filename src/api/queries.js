import { useQuery } from "@tanstack/react-query";

const fetchStatuses = async () => {
  const response = await fetch(
    "https://momentum.redberryinternship.ge/api/statuses"
  );
  if (!response.ok) throw new Error("Failed to fetch statuses");
  const data = await response.json();

  if (Array.isArray(data)) return data;
  if (data.data && Array.isArray(data.data)) return data.data;
  if (data.statuses && Array.isArray(data.statuses)) return data.statuses;

  console.error("Unexpected statuses data structure:", data);
  return [];
};

const fetchPriorities = async () => {
  const response = await fetch(
    "https://momentum.redberryinternship.ge/api/priorities"
  );
  if (!response.ok) throw new Error("Failed to fetch priorities");
  const data = await response.json();

  if (Array.isArray(data)) return data;
  if (data.data && Array.isArray(data.data)) return data.data;
  if (data.priorities && Array.isArray(data.priorities)) return data.priorities;

  console.error("Unexpected priorities data structure:", data);
  return [];
};


const fetchDepartments = async () => {
  const response = await fetch(
    "https://momentum.redberryinternship.ge/api/departments"
  );
  if (!response.ok) throw new Error("Failed to fetch departments");
  const data = await response.json();

  if (Array.isArray(data)) return data;
  if (data.data && Array.isArray(data.data)) return data.data;
  if (data.departments && Array.isArray(data.departments)) return data.departments;

  console.error("Unexpected departments data structure:", data);
  return [];
};


const fetchEmployees = async () => {
  const token = import.meta.env.VITE_BEARER;
  const response = await fetch(
    "https://momentum.redberryinternship.ge/api/employees",
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Authentication required to fetch employees");
    }
    throw new Error(`Failed to fetch employees: ${response.status}`);
  }

  const data = await response.json();

  if (Array.isArray(data)) return data;
  if (data.data && Array.isArray(data.data)) return data.data;
  if (data.employees && Array.isArray(data.employees)) return data.employees;

  console.error("Unexpected employees data structure:", data);
  return [];
};

export function useStatusesQuery() {
  return useQuery({
    queryKey: ['statuses'],
    queryFn: fetchStatuses
  });
}

export function usePrioritiesQuery() {
  return useQuery({
    queryKey: ['priorities'],
    queryFn: fetchPriorities
  });
}

export function useDepartmentsQuery() {
  return useQuery({
    queryKey: ['departments'],
    queryFn: fetchDepartments
  });
}

export function useEmployeesQuery() {
  return useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees
  });
}
