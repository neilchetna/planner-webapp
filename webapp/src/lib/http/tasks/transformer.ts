import { Task } from "@/models";
import { TaskResponseDTO, TaskUpdateDTO } from "./dto";
import { TaskStatus } from "./schema";

export function tasksToVM(dto: TaskResponseDTO): Task {
  return {
    id: dto.id,
    isCompleted: dto.status === TaskStatus.completed,
    title: dto.title,
    description: dto.description,
    createdAt: new Date(dto.createdAt),
  };
}

export function tasksVM2UpdateDTO(vm: Partial<Task>): TaskUpdateDTO {
  const { isCompleted, title, description } = vm;
  const dto: TaskUpdateDTO = {};

  if (typeof title === "string") {
    dto.title = title;
  }

  if (typeof description === "string") {
    dto.description = description;
  }

  if (typeof isCompleted === "boolean") {
    dto.status = isCompleted ? TaskStatus.completed : TaskStatus.todo;
  }
  return dto;
}
