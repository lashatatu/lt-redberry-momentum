import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskData) => {
      const token = import.meta.env.VITE_BEARER;
      console.log("Making API request with token:", token ? "Token exists" : "No token");

      const response = await fetch(
        "https://momentum.redberryinternship.ge/api/tasks",
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(taskData)
        }
      );

      // Log the full response for debugging
      console.log("API Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error Response:", errorData);
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      return await response.json();
    },
    onSuccess: (data) => {
      console.log("Mutation successful, invalidating queries");
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      return data;
    }
  });
};


export const useCreateEmployeeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (employeeData) => {
      const token = import.meta.env.VITE_BEARER;

      const formData = new FormData();
      formData.append("name", employeeData.name);
      formData.append("surname", employeeData.surname);
      formData.append("department_id", employeeData.department);

      if (employeeData.avatar) {
        formData.append("avatar", employeeData.avatar);
      }

      const response = await fetch(
        "https://momentum.redberryinternship.ge/api/employees",
        {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    }
  });
};
