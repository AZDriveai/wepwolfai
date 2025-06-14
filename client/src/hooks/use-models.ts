import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Model, InsertModel } from "@wolf-ai/shared";

export function useModels() {
  const queryClient = useQueryClient();

  const modelsQuery = useQuery<Model[]>({
    queryKey: ["/api/models"],
  });

  const createModel = useMutation({
    mutationFn: async (data: InsertModel) => {
      const response = await apiRequest("POST", "/api/models", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/models"] });
    },
  });

  const updateModel = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: Partial<Model> }) => {
      const response = await apiRequest("PUT", `/api/models/${id}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/models"] });
    },
  });

  const deleteModel = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/models/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/models"] });
    },
  });

  return {
    data: modelsQuery.data,
    isLoading: modelsQuery.isLoading,
    createModel,
    updateModel,
    deleteModel,
  };
}
