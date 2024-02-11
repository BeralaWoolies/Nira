import { IssuePriority, IssueType } from "@/types/issue-types";
import { z } from "zod";

const issueRriorities: Array<IssuePriority | ""> = [
  "",
  "highest",
  "high",
  "medium",
  "low",
  "lowest",
];

const issueTypes: Array<IssueType> = ["task", "bug", "story"];

export const issueFormSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  priority: z.enum(issueRriorities as [string, ...string[]]).optional(),
  type: z.enum(issueTypes as [string, ...string[]]).optional(),
  reporter: z.string().optional(),
});

export type TIssueForm = z.infer<typeof issueFormSchema>;
