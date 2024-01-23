import z from "zod";

export const columnFormSchema = z.object({
  title: z.string().min(1),
});

export type TColumnForm = z.infer<typeof columnFormSchema>;
