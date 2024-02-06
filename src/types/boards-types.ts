import { ColumnsResponse, ProjectsResponse } from "@/types/pocketbase-types";
import { Issue } from "@/types/issue-types";

interface TColumnsExpand {
  issues: Issue[];
}

export type TColumn = ColumnsResponse<TColumnsExpand>;

export interface TBoardsExpand {
  columns: TColumn[];
  project: ProjectsResponse;
}
