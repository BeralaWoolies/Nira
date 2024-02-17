"use server";

import { createServerClient } from "@/lib/pocketbase";
import { TColumnForm } from "@/schemas/column-form";
import { TIssueForm } from "@/schemas/issue-form";
import { Column } from "@/types/column-types";
import { Issue } from "@/types/issue-types";
import { AuthSystemFields, Collections } from "@/types/pocketbase-types";
import { StatusResponse } from "@/types/status-types";
import { cookies } from "next/headers";

export async function updateColumnsOrder(
  boardId: string,
  reorderedColumns: Column[]
): Promise<StatusResponse> {
  const reorderedColumnIds = reorderedColumns.map((col) => col.id);

  try {
    const pb = createServerClient(cookies());
    await pb.collection(Collections.Boards).update(boardId, {
      columns: reorderedColumnIds,
    });

    return {
      success: "Reordered columns successfully",
    };
  } catch (error) {
    return {
      error: "Could not reorder columns",
    };
  }
}

export async function updateIssuesOrder(column: Column): Promise<StatusResponse> {
  const reorderedIssueIds = column.expand!.issues.map((issue) => issue.id);

  try {
    const pb = createServerClient(cookies());
    await pb.collection(Collections.Columns).update(column.id, {
      issues: reorderedIssueIds,
    });

    return {
      success: `Reordered issues successfully in "${column.title}"`,
    };
  } catch (error) {
    return {
      error: `Could not reorder issues in "${column.title}"`,
    };
  }
}

export async function updateIssuesOrderBetween(
  sourceColumn: Column,
  destColumn: Column,
  destIndex: number
): Promise<StatusResponse> {
  try {
    const pb = createServerClient(cookies());
    await pb.send("/api/nira/update/issues-between", {
      method: "PUT",
      body: {
        sourceColumnId: sourceColumn.id,
        sourceColumnIssueIds: sourceColumn.expand!.issues.map((issue) => issue.id),
        destColumnId: destColumn.id,
        destColumnIssueIds: destColumn.expand!.issues.map((issue) => issue.id),
        destIndex: destIndex,
      },
    });

    return {
      success: `Successfully moved issue to "${destColumn.title}"`,
    };
  } catch (error) {
    return {
      error: `Could not move issue from "${sourceColumn.title}" to "${destColumn.title}"`,
    };
  }
}

export async function createIssue(columnId: string, values: TIssueForm): Promise<StatusResponse> {
  try {
    const pb = createServerClient(cookies());
    const reporter = pb.authStore.model as AuthSystemFields;
    await pb.collection(Collections.Issues).create({
      title: values.title,
      column: columnId,
      reporter: reporter.id,
    });

    return {
      success: `Successfully created new issue "${values.title}"`,
    };
  } catch (error) {
    return {
      error: `Could not create new issue "${values.title}"`,
    };
  }
}

export async function createColumn(boardId: string, values: TColumnForm): Promise<StatusResponse> {
  try {
    const pb = createServerClient(cookies());
    await pb.collection(Collections.Columns).create({
      board: boardId,
      title: values.title,
    });

    return {
      success: `Successfully created new column "${values.title}"`,
    };
  } catch (error) {
    return {
      error: `Could not create new column "${values.title}"`,
    };
  }
}

export async function deleteIssue(issue: Issue): Promise<StatusResponse> {
  try {
    const pb = createServerClient(cookies());
    await pb.collection(Collections.Issues).delete(issue.id);

    return {
      success: `Successfully deleted issue "${issue.title}"`,
    };
  } catch (error) {
    return {
      error: `Could not delete issue "${issue.title}"`,
    };
  }
}

export async function updateIssue(issue: Issue, values: TIssueForm) {
  try {
    const pb = createServerClient(cookies());
    const updatedIssue = await pb.collection(Collections.Issues).update(issue.id, values);

    return {
      success: `Successfully edited issue "${updatedIssue.title}"`,
    };
  } catch (error) {
    return {
      error: `Could not edit issue "${issue.title}"`,
    };
  }
}

export async function updateColumn(column: Column, values: TColumnForm) {
  try {
    const pb = createServerClient(cookies());
    const updatedColumn = await pb.collection(Collections.Columns).update(column.id, values);

    return {
      success: `Successfully edited column "${updatedColumn.title}"`,
    };
  } catch (error) {
    return {
      error: `Could not edit column "${column.title}"`,
    };
  }
}

export async function deleteColumn(column: Column) {
  try {
    const pb = createServerClient(cookies());
    await pb.collection(Collections.Columns).delete(column.id);

    return {
      success: `Successfully deleted column "${column.title}"`,
    };
  } catch (error) {
    return {
      error: `Could not delete column "${column.title}"`,
    };
  }
}
