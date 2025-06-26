import { Plan } from "@/models";
import { PlanResponseDTO } from "./dto";
import { tasksToVM } from "../tasks";

export function planToVM(dto: PlanResponseDTO): Plan {
  const tasks = dto.tasks?.map(tasksToVM);

  const vm = {
    id: dto.id,
    createdAt: new Date(dto.createdAt),
    title: dto.title,
    icon: dto.icon,
  };

  if (tasks) {
    Object.assign(vm, { tasks });
  }

  return vm;
}
