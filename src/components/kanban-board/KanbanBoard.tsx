"use client";

import { TColumn } from "@/types/boards-types";
import React, { useEffect, useState } from "react";
import Column from "@/components/kanban-board/Column";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import {
  updateColumnsOrder,
  updateIssuesOrder,
  updateIssuesOrderBetween,
} from "@/actions/kanban-board";
import { produce } from "immer";

interface KanbanBoardProps {
  data: TColumn[];
  boardId: string;
}

export default function KanbanBoard({ data, boardId }: KanbanBoardProps) {
  console.log("KanbanBoard rendered");

  const [columns, setColumns] = useState(data);
  console.table(columns);

  useEffect(() => {
    setColumns(data);
  }, [data]);

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
    const newColumns = produce(columns, (draftColumns) =>
      reorderArray(draftColumns, sourceIndex, destIndex)
    );

    setColumns(newColumns);
    const result = await updateColumnsOrder(boardId, newColumns);
    if (result?.error) {
      console.error(result.error);
    }
  }

  async function reorderIssues(sourceColumnId: string, sourceIndex: number, destIndex: number) {
    const sourceColumnIndex = columns.findIndex((col) => col.id === sourceColumnId);

    if (sourceColumnIndex === -1) return;

    const newColumns = produce(columns, (draftColumns) => {
      const sourceColumn = draftColumns[sourceColumnIndex];

      sourceColumn.expand ??= { issues: [] };
      sourceColumn.expand.issues = reorderArray(sourceColumn.expand.issues, sourceIndex, destIndex);
    });

    setColumns(newColumns);
    const result = await updateIssuesOrder(newColumns[sourceColumnIndex]);
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
    const sourceColumnIndex = columns.findIndex((col) => col.id === sourceColumnId);
    const destColumnIndex = columns.findIndex((col) => col.id === destColumnId);

    if (sourceColumnIndex === -1 || destColumnIndex === -1) return;

    const newColumns = produce(columns, (draftColumns) => {
      const sourceColumn = draftColumns[sourceColumnIndex];
      const destColumn = draftColumns[destColumnIndex];

      sourceColumn.expand ??= { issues: [] };
      destColumn.expand ??= { issues: [] };

      // move issue from source column to destination column
      const [movedIssue] = sourceColumn.expand.issues.splice(sourceIndex, 1);
      destColumn.expand.issues.splice(destIndex, 0, movedIssue);
    });

    setColumns(newColumns);
    const result = await updateIssuesOrderBetween(
      newColumns[sourceColumnIndex],
      newColumns[destColumnIndex]
    );
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
            className="flex overflow-x-auto"
          >
            {columns.map((col, index) => (
              <Column key={col.id} column={col} index={index} />
            ))}
            {droppableProvided.placeholder}
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
}
