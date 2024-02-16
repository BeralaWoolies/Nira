import { useEffect, useState } from "react";
import debounce from "debounce";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/pocketbase";
import { Column } from "@/types/column-types";
import { useSetAtom } from "jotai";
import { membersAtom } from "@/store/atoms";
import {
  Collections,
  ColumnsResponse,
  IssuesResponse,
  UsersResponse,
} from "@/types/pocketbase-types";

export default function useKanbanBoard(boardId: string, data: Column[], members: UsersResponse[]) {
  const router = useRouter();

  const [columns, setColumns] = useState(data);
  const setMembers = useSetAtom(membersAtom);

  useEffect(() => {
    setColumns(data);
    setMembers(members);
  }, [data, members, setMembers]);

  useEffect(() => {
    const debounceRefresh = debounce(() => {
      router.refresh();
    }, 1000);

    const pb = createBrowserClient();
    pb.collection(Collections.Boards).subscribe(boardId, () => {
      debounceRefresh();
    });

    pb.collection(Collections.Columns).subscribe(
      "*",
      (e) => e.record.board === boardId && debounceRefresh()
    );

    pb.collection(Collections.Issues).subscribe<
      IssuesResponse<{
        column: ColumnsResponse;
      }>
    >("*", (e) => e.record.expand?.column.board === boardId && debounceRefresh(), {
      expand: "column",
    });

    return () => {
      pb.collection(Collections.Boards).unsubscribe();
      pb.collection(Collections.Columns).unsubscribe();
      pb.collection(Collections.Issues).unsubscribe();
      debounceRefresh.clear();
    };
  }, [boardId, router]);

  return [columns, setColumns] as const;
}
