import { z } from "zod/v4";
import { BaseSchema } from "./base";

const TaskSchema = BaseSchema.extend({
  title: z.string().min(3),
  description: z.string().optional(),
});

// Task VM
export const TaskVM = TaskSchema.extend({
  loading: z.boolean().optional(),
  error: z.string().optional(),
});

export type Task = z.infer<typeof TaskVM>;

// Task DTO
export const TaskDTOSchema = TaskSchema.pick({
  title: true,
  description: true,
});

export type TaskDTO = z.infer<typeof TaskDTOSchema>;
