"use client";

import { TColumn } from "@/types/boards-types";
import React from "react";
import IssueCard from "@/components/kanban-board/IssueCard";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import CreateIssueForm from "@/components/kanban-board/CreateIssueForm";
import isEqual from "react-fast-compare";

interface ColumnProps {
  column: TColumn;
  index: number;
}

const Column = React.memo(
  function Column({ column, index }: ColumnProps) {
    return (
      <Draggable key={column.id} draggableId={column.id.toString()} index={index}>
        {(draggableProvided) => (
          <div
            className="group/[issue-form] mb-2 mr-4 flex min-w-[17rem] flex-col rounded-sm bg-secondary shadow-md"
            ref={draggableProvided.innerRef}
            {...draggableProvided.draggableProps}
          >
            <div
              className="flex items-center rounded-t-sm py-2 pl-1 shadow-sm"
              {...draggableProvided.dragHandleProps}
            >
              <DragHandleDots2Icon className="mr-1 h-4 w-4" />
              <h1 className="text-sm">{column.title}</h1>
            </div>
            <div className="overflow-y-auto">
              <Droppable droppableId={column.id} type="issue" direction="vertical">
                {(droppableProvided) => (
                  <ol
                    ref={droppableProvided.innerRef}
                    {...droppableProvided.droppableProps}
                    className="flex w-full flex-col items-center p-1"
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
          </div>
        )}
      </Draggable>
    );
  },
  function propsAreEqual(prevProps, nextProps) {
    return prevProps.index === nextProps.index && isEqual(prevProps.column, nextProps.column);
  }
);

export default Column;
