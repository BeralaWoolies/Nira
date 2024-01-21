"use client";

import { TColumn } from "@/types/boards-types";
import React, { useState } from "react";
import Column from "@/components/kanban-board/Column";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import {
  updateColumnsOrder,
  updateIssuesOrder,
  updateIssuesOrderBetween,
} from "@/actions/kanban-board";

interface KanbanBoardProps {
  data: TColumn[];
  boardId: string;
}

export default function KanbanBoard({ data, boardId }: KanbanBoardProps) {
  console.log("KanbanBoard rendered");
  console.dir(data, { depth: null });

  const [columns, setColumns] = useState(data);
  console.table(columns);

  function handleDragEnd(result: DropResult) {
    const { source, destination, type } = result;

    if (!destination) return;

    if (source.index === destination.index && source.droppableId === destination.droppableId)
      return;

    // reordering columns
    if (type === "column") {
      reorderColumns(source.index, destination.index);
      return;
    }

    // reordering issues within same column
    if (source.droppableId === destination.droppableId) {
      reorderIssues(source.droppableId, source.index, destination.index);
    } else {
      // reordering issues between columns
      reorderIssuesBetween(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index
      );
    }
  }

  async function reorderColumns(sourceIndex: number, destIndex: number) {
    const newColumns = [...columns];
    const reorderedColumns = reorderArray(newColumns, sourceIndex, destIndex);

    setColumns(reorderedColumns);
    const result = await updateColumnsOrder(boardId, reorderedColumns);
    if (result?.error) {
      console.error(result.error);
    }
  }

  async function reorderIssues(sourceColumnId: string, sourceIndex: number, destIndex: number) {
    const newColumns = [...columns];
    const column = newColumns.find((col) => col.id === sourceColumnId) as TColumn;

    if (!column.expand) return;

    const reorderedIssues = reorderArray(column.expand.issues, sourceIndex, destIndex);
    column.expand.issues = reorderedIssues;

    setColumns(newColumns);
    const result = await updateIssuesOrder(column);
    if (result?.error) {
      console.error(result.error);
    }
  }

  async function reorderIssuesBetween(
    sourceColumnId: string,
    destColumnId: string,
    sourceIndex: number,
    destIndex: number
  ) {
    const newColumns = [...columns];
    const sourceColumn = newColumns.find((col) => col.id === sourceColumnId) as TColumn;
    const destColumn = newColumns.find((col) => col.id === destColumnId) as TColumn;

    if (!sourceColumn.expand) return;

    if (!destColumn.expand) {
      destColumn.expand = {
        issues: [],
      };
    }

    // move issue from source column to destination column
    const [movedIssue] = sourceColumn.expand.issues.splice(sourceIndex, 1);
    destColumn.expand.issues.splice(destIndex, 0, movedIssue);

    setColumns(newColumns);
    const result = await updateIssuesOrderBetween(sourceColumn, destColumn);
    if (result?.error) {
      console.error(result.error);
    }
  }

  function reorderArray<T>(list: T[], sourceIndex: number, destIndex: number): T[] {
    const items = [...list];
    const [reorderedItem] = items.splice(sourceIndex, 1);
    items.splice(destIndex, 0, reorderedItem);
    return items;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="columns" type="column" direction="horizontal">
        {(droppableProvided) => (
          <ol
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
            className="flex"
          >
            {columns?.map((col, index) => <Column key={col.id} column={col} index={index} />)}
            {droppableProvided.placeholder}
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
}
