import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTaskStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskId, statusId }) => {
      const token = import.meta.env.VITE_BEARER;

      const response = await fetch(
        `https://momentum.redberryinternship.ge/api/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ status_id: statusId })
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      return await response.json();
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['task', variables.taskId] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });
};

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskData) => {
      const token = import.meta.env.VITE_BEARER;


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

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error Response:", errorData);
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      return await response.json();
    },
    onSuccess: (data) => {
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
