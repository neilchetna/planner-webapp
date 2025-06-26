import { Plan } from "@/models";
import { PlanResponseDTO } from "./dto";
import { tasksToVM } from "../tasks";

export function planToVM(dto: PlanResponseDTO): Plan {
  const tasks = dto.tasks?.map(tasksToVM) || [];

  return {
    id: dto.id,
    createdAt: new Date(dto.createdAt),
    tasks,
    title: dto.title,
    icon: dto.icon,
  };
}
