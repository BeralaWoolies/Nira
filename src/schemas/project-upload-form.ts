import { z } from "zod";

const MAX_FILE_SIZE = 5242880;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const projectUploadFormSchema = z.object({
  avatar: z
    .custom<File>()
    .nullable()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

export type TProjectUploadForm = z.infer<typeof projectUploadFormSchema>;
