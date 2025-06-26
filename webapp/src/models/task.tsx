import { BaseModel } from "./base";

export type Task = BaseModel & {
  title: string;
  description?: string;
  loading?: boolean;
  error?: string;
  isSelected?: boolean;
  isEditing?: boolean;
};
