import KanbanBoard from "@/components/kanban-board/KanbanBoard";
import { createServerClient } from "@/lib/pocketbase";
import { Column } from "@/types/column-types";
import { cookies } from "next/headers";
import {
  BoardsResponse,
  Collections,
  ProjectsResponse,
  UsersResponse,
} from "@/types/pocketbase-types";

interface BoardsPageProps {
  params: {
    boardId: string;
  };
}

export default async function BoardsPage({ params }: BoardsPageProps) {
  console.log("Boards Page rendered");

  const pb = createServerClient(cookies());
  const data = await pb.collection(Collections.Boards).getOne<
    BoardsResponse<{
      columns: Column[];
      project: ProjectsResponse<{
        members: UsersResponse[];
      }>;
    }>
  >(params.boardId, {
    expand:
      "project, project.members, columns, columns.issues, columns.issues.reporter, columns.issues.assignee",
  });

  return (
    <>
      <div className="h-full space-y-3">
        <h1 className="text-2xl font-semibold">{`${data.expand!.project.key} board`}</h1>
        <KanbanBoard
          data={data.expand!.columns}
          boardId={params.boardId}
          members={data.expand!.project.expand!.members}
        />
      </div>
    </>
  );
}
