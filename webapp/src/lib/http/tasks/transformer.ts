import { Task } from "@/models";
import { TaskResponseDTO } from "./dto";

export function tasksToVM(dto: TaskResponseDTO): Task {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    createdAt: new Date(dto.createdAt),
  };
}
