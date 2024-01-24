"use server";

import { createServerClient } from "@/lib/pocketbase";
import { TColumnForm } from "@/schemas/column-form";
import { TIssueForm } from "@/schemas/issue-form";
import { TColumn } from "@/types/boards-types";
import { Collections } from "@/types/pocketbase-types";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";

export type KanbanResponse =
  | {
      success: string;
      error?: undefined;
    }
  | {
      error: string;
      success?: undefined;
    };

export async function updateColumnsOrder(
  boardId: string,
  reorderedColumns: TColumn[]
): Promise<KanbanResponse> {
  const reorderedColumnIds = reorderedColumns.map((col) => col.id);

  try {
    const pb = createServerClient(cookies());
    await pb.collection(Collections.Boards).update(boardId, {
      columns: reorderedColumnIds,
    });

    revalidatePath(headers().get("referer") || "");
    return {
      success: "Swapped columns successfully",
    };
  } catch (error) {
    return {
      error: "Could not reorder columns",
    };
  }
}

export async function updateIssuesOrder(column: TColumn): Promise<KanbanResponse> {
  const reorderedIssueIds = column.expand!.issues.map((issue) => issue.id);

  try {
    const pb = createServerClient(cookies());
    await pb.collection(Collections.Columns).update(column.id, {
      issues: reorderedIssueIds,
    });

    revalidatePath(headers().get("referer") || "");
    return {
      success: `Swapped issues successfully in "${column.title}"`,
    };
  } catch (error) {
    return {
      error: `Could not reorder issues in "${column.title}"`,
    };
  }
}

export async function updateIssuesOrderBetween(
  sourceColumn: TColumn,
  destColumn: TColumn
): Promise<KanbanResponse> {
  try {
    const pb = createServerClient(cookies());
    await pb.send("/api/nira/update/issues-between", {
      method: "POST",
      body: {
        sourceColumnId: sourceColumn.id,
        sourceColumnIssueIds: sourceColumn.expand!.issues.map((issue) => issue.id),
        destColumnId: destColumn.id,
        destColumnIssueIds: destColumn.expand!.issues.map((issue) => issue.id),
      },
    });

    revalidatePath(headers().get("referer") || "");
    return {
      success: `Successfully moved issue to "${destColumn.title}"`,
    };
  } catch (error) {
    return {
      error: `Could not move issue from "${sourceColumn.title}" to "${destColumn.title}"`,
    };
  }
}

export async function createIssue(columnId: string, values: TIssueForm): Promise<KanbanResponse> {
  try {
    const pb = createServerClient(cookies());
    await pb.send("/api/nira/issue", {
      method: "POST",
      body: {
        columnId: columnId,
        title: values.title,
      },
    });

    revalidatePath(headers().get("referer") || "");
    return {
      success: `Successfully created new issue "${values.title}"`,
    };
  } catch (error) {
    return {
      error: `Could not create new issue "${values.title}"`,
    };
  }
}

export async function createColumn(boardId: string, values: TColumnForm): Promise<KanbanResponse> {
  try {
    const pb = createServerClient(cookies());
    await pb.send("/api/nira/column", {
      method: "POST",
      body: {
        boardId: boardId,
        title: values.title,
      },
    });

    revalidatePath(headers().get("referer") || "");
    return {
      success: `Successfully created new column "${values.title}"`,
    };
  } catch (error) {
    return {
      error: `Could not create new column "${values.title}"`,
    };
  }
}
