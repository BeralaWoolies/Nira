import {
  BoardsResponse,
  ColumnsResponse,
  IssuesResponse,
  UsersResponse,
} from "@/types/pocketbase-types";

export interface TColumnsExpand {
  issues: IssuesResponse[];
}

export interface TBoardsExpand {
  columns: ColumnsResponse<TColumnsExpand>[];
}

export interface TProjectsExpand {
  members: UsersResponse[];
  board: BoardsResponse<TBoardsExpand>;
}
