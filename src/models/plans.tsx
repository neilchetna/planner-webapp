import { Task } from "./task";

export type Plan = {
  id: string;
  title: string;
  icon: React.ReactNode;
  tasks: Task[];
};
