import { ProjectsResponse, UsersResponse } from "@/types/pocketbase-types";

export interface Project {
  project: ProjectsResponse<{
    members: UsersResponse[];
  }>;
}
