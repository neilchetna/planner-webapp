import { z } from "zod/v4";

export const BaseSchema = z.object({
  id: z.uuid(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
