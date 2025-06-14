import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { ApiKey, InsertApiKey } from "@wolf-ai/shared";

export function useApiKeys() {
  const queryClient = useQueryClient();

  const apiKeysQuery = useQuery<ApiKey[]>({
    queryKey: ["/api/api-keys"],
  });

  const createApiKey = useMutation({
    mutationFn: async (data: InsertApiKey) => {
      const response = await apiRequest("POST", "/api/api-keys", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/api-keys"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
  });

  const updateApiKey = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: Partial<ApiKey> }) => {
      const response = await apiRequest("PUT", `/api/api-keys/${id}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/api-keys"] });
    },
  });

  const deleteApiKey = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/api-keys/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/api-keys"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
  });

  return {
    data: apiKeysQuery.data,
    isLoading: apiKeysQuery.isLoading,
    createApiKey,
    updateApiKey,
    deleteApiKey,
  };
}
