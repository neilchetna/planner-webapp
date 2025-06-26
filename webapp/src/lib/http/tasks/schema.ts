import { BaseSchema } from "@/models";
import { z } from "zod/v4";

const TasksBaseSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
});

export const TasksCreateSchema = TasksBaseSchema;

export const TasksUpdateSchema = TasksCreateSchema;

export const TasksResponseSchema = BaseSchema.extend(TasksBaseSchema.shape);
