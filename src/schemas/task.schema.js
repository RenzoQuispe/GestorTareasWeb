import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  
  description: z.string({required_error: "Descripcion debe ser un String",}),
  date: z.string().datetime().optional(),
});