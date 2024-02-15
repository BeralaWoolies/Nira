import { z } from "zod";

export const projectFormSchema = z
  .object({
    name: z.string().min(1).max(72),
    key: z.string().min(1).max(10),
    description: z.string().max(250),
  })
  .refine((data) => data.key.match(/^[0-9A-Z]+$/), {
    message: "Project keys can only contain uppercase alphanumeric characters",
    path: ["key"],
  });

export type TProjectForm = z.infer<typeof projectFormSchema>;
