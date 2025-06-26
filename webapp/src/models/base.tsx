import { z } from "zod/v4";

export const BaseSchema = z.object({
  id: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export type BaseModel = z.infer<typeof BaseSchema>;
