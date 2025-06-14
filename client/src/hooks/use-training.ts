import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { TrainingJob, InsertTrainingJob } from "@wolf-ai/shared";

export function useTraining() {
  const queryClient = useQueryClient();

  const trainingJobsQuery = useQuery<TrainingJob[]>({
    queryKey: ["/api/training-jobs"],
  });

  const startTraining = useMutation({
    mutationFn: async (data: InsertTrainingJob) => {
      const response = await apiRequest("POST", "/api/training-jobs", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/training-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
  });

  const updateTrainingJob = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: Partial<TrainingJob> }) => {
      const response = await apiRequest("PUT", `/api/training-jobs/${id}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/training-jobs"] });
    },
  });

  return {
    data: trainingJobsQuery.data,
    isLoading: trainingJobsQuery.isLoading,
    startTraining,
    updateTrainingJob,
  };
}
