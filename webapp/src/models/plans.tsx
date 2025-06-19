import { z } from "zod/v4";
import { Task, TaskVM } from "./task";
import { BaseSchema } from "./base";

const PlanSchema = BaseSchema.extend({
  title: z.string().min(3),
  icon: z.emoji().or(z.string()).optional(),
});

// Plan VM
export const PlanVM = PlanSchema.extend({
  loading: z.boolean().optional(),
  error: z.string().optional(),
  tasks: z.array(TaskVM),
});

export type Plan = z.infer<typeof PlanVM & { tasks: Task[] }>;

// Plan DTO
export const PlanDTOSchema = PlanSchema.pick({ title: true, icon: true });

export type PlanDTO = z.infer<typeof PlanDTOSchema>;
