import { ColumnsResponse } from "@/types/pocketbase-types";
import { Issue } from "@/types/issue-types";

export type Column = ColumnsResponse<{
  issues: Issue[];
}>;
