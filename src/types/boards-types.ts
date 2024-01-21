import { ColumnsResponse, IssuesResponse, ProjectsResponse } from "@/types/pocketbase-types";

interface TColumnsExpand {
  issues: IssuesResponse[];
}

export type TColumn = ColumnsResponse<TColumnsExpand>;

export interface TBoardsExpand {
  columns: TColumn[];
  project: ProjectsResponse;
}
