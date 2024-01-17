import BoardsView from "@/components/boards/BoardsView";
import { createServerClient } from "@/lib/pocketbase";
import { TProjectsExpand } from "@/types/boards-interface";
import { Collections, ProjectsResponse } from "@/types/pocketbase-types";
import { cookies } from "next/headers";

interface BoardsPageProps {
  params: {
    projectId: string;
  };
}

export default async function BoardsPage({ params }: BoardsPageProps) {
  async function getProject(projectId: string) {
    const pb = createServerClient(cookies());

    return await pb
      .collection(Collections.Projects)
      .getOne<ProjectsResponse<TProjectsExpand>>(projectId, {
        expand: "members, board, board.columns, board.columns.issues",
      });
  }

  const project = await getProject(params.projectId);
  const board = project.expand?.board;
  const members = project.expand?.members;
  console.dir(board, { depth: null });
  console.dir(members, { depth: null });
  return <BoardsView project={project} />;
}
