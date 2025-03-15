import { useMutation, useQueryClient } from "@tanstack/react-query";

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
