import { Task } from "@/models";
import http from "../api";
import { TaskCreateDTO, TaskResponseDTO } from "./dto";
import { AxiosResponse } from "axios";
import { tasksToVM } from "./transformer";

export function apiFactory() {
  const transformTaskDTO2VM = (res: AxiosResponse<TaskResponseDTO>): Task => tasksToVM(res.data);
  return {
    async postTask(planId: string, taskDTO: TaskCreateDTO): Promise<Task> {
      return http.post<TaskResponseDTO>(`/plan/${planId}/task`, taskDTO).then(transformTaskDTO2VM);
    },

    async patchTask(planId: string, taskId: string, taskDTO: TaskCreateDTO): Promise<Task> {
      return http
        .patch<TaskResponseDTO>(`/plan/${planId}/task/${taskId}`, taskDTO)
        .then(transformTaskDTO2VM);
    },

    async deleteTask(planId: string, taskId: string): Promise<void> {
      return http.delete(`/plan/${planId}/task/${taskId}`);
    },
  };
}
