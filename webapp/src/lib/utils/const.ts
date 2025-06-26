import { Task } from "@/models";
import { PlanCreateDTO } from "../http";

export const BLANK_TASK: Task = {
  createdAt: new Date(),
  id: "new-task-id",
  title: "",
  loading: false,
  error: "",
};

export const BLANK_PLAN: PlanCreateDTO = {
  title: "Untitled",
};
