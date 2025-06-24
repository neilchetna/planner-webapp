import { Task, TaskDTO } from "@/models";
import http from "./api";

export function apiFactory() {
  return {
    async postTask(planId: string, taskDTO: TaskDTO): Promise<Task> {
      return http.post(`/plan/${planId}/task`, taskDTO).then(res => res.data);
    },

    async patchTask(planId: string, taskId: string, taskDTO: TaskDTO): Promise<Task> {
      return http.patch(`/plan/${planId}/task/${taskId}`, taskDTO).then(res => res.data);
    },

    async deleteTask(planId: string, taskId: string): Promise<void> {
      return http.delete(`/plan/${planId}/task/${taskId}`);
    },
  };
}
