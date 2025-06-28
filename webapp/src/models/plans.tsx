import { z } from "zod/v4";
import { BaseModel } from "./base";
import { Task } from "./task";

export type Plan = BaseModel & {
  title: string;
  tasks?: Task[];
  icon?: string;
  loading?: boolean;
  error?: string;
};

// Input Schema
export const PlanCreateInput = z.object({
  title: z.string().min(3),
});

export const PlanUpdateInput = z
  .object({
    title: z.string().min(3),
  })
  .partial();

export type PlanCreate = z.infer<typeof PlanCreateInput>;
export type PlanUpdate = z.infer<typeof PlanUpdateInput>;
