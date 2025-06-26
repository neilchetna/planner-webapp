import { BaseModel } from "./base";
import { Task } from "./task";

export type Plan = BaseModel & {
  title: string;
  tasks: Task[];
  icon?: string;
  loading?: boolean;
  error?: string;
};
