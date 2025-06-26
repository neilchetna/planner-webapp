import { z } from "zod/v4";
import { PlanCreateSchema, PlanResponseSchema, PlanUpdateSchema } from "./schema";

export type PlanCreateDTO = z.infer<typeof PlanCreateSchema>;
export type PlanUpdateDTO = z.infer<typeof PlanUpdateSchema>;
export type PlanResponseDTO = z.infer<typeof PlanResponseSchema>;
