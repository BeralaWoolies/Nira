"use client";

import { TColumn } from "@/types/boards-types";
import React from "react";
import IssueCard from "@/components/kanban-board/IssueCard";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import CreateIssueForm from "@/components/kanban-board/CreateIssueForm";

interface ColumnProps {
  column: TColumn;
  index: number;
}

export default function Column({ column, index }: ColumnProps) {
  return (
    <Draggable key={column.id} draggableId={column.id.toString()} index={index}>
      {(draggableProvided) => (
        <div
          className="group mr-4 h-[540px] w-[270px] rounded-md bg-secondary shadow-md"
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
        >
          <div {...draggableProvided.dragHandleProps} className="flex items-center py-2 pl-1">
            <DragHandleDots2Icon className="mr-1 h-4 w-4" />
            <h1 className="text-sm">{column.title}</h1>
          </div>
          <Droppable droppableId={column.id} type="issue" direction="vertical">
            {(droppableProvided) => (
              <ol
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
                className="flex h-full w-full flex-col items-center p-1"
              >
                {column.expand?.issues.map((issue, index) => (
                  <IssueCard key={issue.id} issue={issue} index={index} />
                ))}
                {droppableProvided.placeholder}
                <CreateIssueForm columnId={column.id} />
              </ol>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
