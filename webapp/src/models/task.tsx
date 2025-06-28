import { z } from "zod/v4";
import { BaseModel } from "./base";

export type Task = BaseModel & {
  title: string;
  isCompleted: boolean;
  description?: string;
  loading?: boolean;
  error?: string;
  isSelected?: boolean;
  isEditing?: boolean;
};

// Input Schema
export const TaskCreateInput = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
});

export const TaskUpdateInput = z
  .object({
    title: z.string().min(3),
    description: z.string(),
    isCompleted: z.boolean(),
  })
  .partial();

export type TaskCreate = z.infer<typeof TaskCreateInput>;
export type TaskUpdate = z.infer<typeof TaskUpdateInput>;
