import { BaseSchema } from "@/models";
import { z } from "zod/v4";
import { TasksResponseSchema } from "../tasks/schema";

const PlanBaseSchema = z.object({
  title: z.string().min(3),
  icon: z.emoji().or(z.string()).optional(),
});

export const PlanCreateSchema = PlanBaseSchema;

export const PlanUpdateSchema = PlanCreateSchema.partial();

export const PlanResponseSchema = BaseSchema.extend({
  ...PlanBaseSchema.shape,
  tasks: z.array(TasksResponseSchema).optional(),
});
