import { IssuesPriorityOptions, IssuesTypeOptions } from "@/types/pocketbase-types";

export type IssuePriority = keyof typeof IssuesPriorityOptions;

export type IssueType = keyof typeof IssuesTypeOptions;
