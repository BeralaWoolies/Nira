import * as z from "zod";

export const issueFormSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
});

export type TIssueForm = z.infer<typeof issueFormSchema>;
