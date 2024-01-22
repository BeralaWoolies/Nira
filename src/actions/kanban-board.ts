"use server";

import { createServerClient } from "@/lib/pocketbase";
import { TIssueForm } from "@/schemas/issue-form";
import { TColumn } from "@/types/boards-types";
import { Collections } from "@/types/pocketbase-types";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";

export async function updateColumnsOrder(boardId: string, reorderedColumns: TColumn[]) {
  const reorderedColumnIds = reorderedColumns.map((col) => col.id);

  try {
    const pb = createServerClient(cookies());
    await pb.collection(Collections.Boards).update(boardId, {
      columns: reorderedColumnIds,
    });
  } catch (error) {
    return {
      error: `Could not reorder columns of board: ${boardId}`,
    };
  }

  revalidatePath(headers().get("referer") || "");
}

export async function updateIssuesOrder(column: TColumn) {
  const reorderedIssueIds = column.expand!.issues.map((issue) => issue.id);

  try {
    const pb = createServerClient(cookies());
    await pb.collection(Collections.Columns).update(column.id, {
      issues: reorderedIssueIds,
    });
  } catch (error) {
    return {
      error: `Could not reorder issues of column: ${column.id}`,
    };
  }

  revalidatePath(headers().get("referer") || "");
}

export async function updateIssuesOrderBetween(sourceColumn: TColumn, destColumn: TColumn) {
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
  } catch (error) {
    return {
      error: `Could not reorder issues between source column: ${sourceColumn.id} and destination column: ${destColumn.id}`,
    };
  }

  revalidatePath(headers().get("referer") || "");
}

export async function createIssue(columnId: string, values: TIssueForm) {
  try {
    const pb = createServerClient(cookies());
    await pb.send("/api/nira/issue", {
      method: "POST",
      body: {
        columnId: columnId,
        title: values.title,
      },
    });
  } catch (error) {
    return {
      error: `Could not create issue in column: ${columnId}`,
    };
  }

  revalidatePath(headers().get("referer") || "");
}
