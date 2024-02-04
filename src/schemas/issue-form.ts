import { IssuePriority } from "@/types/issue-types";
import { z } from "zod";

const priorities: Array<IssuePriority | ""> = ["", "highest", "high", "medium", "low", "lowest"];

export const issueFormSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  priority: z.enum(priorities as [string, ...string[]]).optional(),
});

export type TIssueForm = z.infer<typeof issueFormSchema>;
