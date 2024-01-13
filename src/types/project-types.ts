import { ProjectsResponse, UsersResponse } from "./pocketbase-types";

export interface Project {
  project: ProjectsResponse<{
    members: UsersResponse[];
  }>;
}
