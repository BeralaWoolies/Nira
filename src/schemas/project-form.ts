import { z } from "zod";

const MAX_FILE_SIZE = 5242880;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const projectFormSchema = z
  .object({
    name: z.string().min(1).max(72),
    key: z.string().min(1).max(10),
    description: z.string().max(250),
    avatar: z
      .custom<File>()
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        ".jpg, .jpeg, .png and .webp files are accepted."
      )
      .optional(),
  })
  .refine((data) => data.key.match(/^[0-9A-Z]+$/), {
    message: "Project keys can only contain uppercase alphanumeric characters",
    path: ["key"],
  });

export type TProjectForm = z.infer<typeof projectFormSchema>;
