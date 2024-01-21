import KanbanBoard from "@/components/kanban-board/KanbanBoard";
import { createServerClient } from "@/lib/pocketbase";
import { TBoardsExpand } from "@/types/boards-types";
import { BoardsResponse, Collections } from "@/types/pocketbase-types";
import { cookies } from "next/headers";

interface BoardsPageProps {
  params: {
    boardId: string;
  };
}

export default async function BoardsPage({ params }: BoardsPageProps) {
  console.log("Boards Page rendered");

  const pb = createServerClient(cookies());
  const data = await pb
    .collection(Collections.Boards)
    .getOne<BoardsResponse<TBoardsExpand>>(params.boardId, {
      expand: "project, columns, columns.issues",
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
