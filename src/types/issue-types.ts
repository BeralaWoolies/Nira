import {
  IssuesPriorityOptions,
  IssuesResponse,
  IssuesTypeOptions,
  UsersResponse,
} from "@/types/pocketbase-types";

export type IssuePriority = keyof typeof IssuesPriorityOptions;

export type IssueType = keyof typeof IssuesTypeOptions;

export type Issue = IssuesResponse<{
  reporter: UsersResponse;
  assignee: UsersResponse;
}>;
