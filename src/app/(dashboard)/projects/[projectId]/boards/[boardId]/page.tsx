import KanbanBoard from "@/components/kanban-board/KanbanBoard";
import { createServerClient } from "@/lib/pocketbase";
import { Column } from "@/types/column-types";
import { BoardsResponse, Collections, ProjectsResponse } from "@/types/pocketbase-types";
import { cookies } from "next/headers";

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
      project: ProjectsResponse;
    }>
  >(params.boardId, {
    expand: "project, columns, columns.issues, columns.issues.reporter",
  });

  return (
    <>
      <div className="h-full space-y-3">
        <h1 className="text-2xl font-semibold">{`${data.expand!.project.key} board`}</h1>
        <KanbanBoard data={data.expand!.columns} boardId={params.boardId} />
      </div>
    </>
  );
}
