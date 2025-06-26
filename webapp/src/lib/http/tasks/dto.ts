import { z } from "zod/v4";
import { TasksCreateSchema, TasksResponseSchema, TasksUpdateSchema } from "./schema";

export type TaskCreateDTO = z.infer<typeof TasksCreateSchema>;
export type TaskUpdateDTO = z.infer<typeof TasksUpdateSchema>;
export type TaskResponseDTO = z.infer<typeof TasksResponseSchema>;
