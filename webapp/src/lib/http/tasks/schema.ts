import { BaseSchema } from "@/models";
import { z } from "zod/v4";

export enum TaskStatus {
  todo = "todo",
  completed = "completed",
}

const TasksBaseSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  status: z.enum(TaskStatus).optional(),
});

//
export const TasksCreateSchema = TasksBaseSchema;

export const TasksUpdateSchema = TasksCreateSchema.partial();

export const TasksResponseSchema = BaseSchema.extend(TasksBaseSchema.shape);
