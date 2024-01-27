"use client";

import { TColumn } from "@/types/boards-types";
import React from "react";
import IssueCard from "@/components/kanban-board/issue/IssueCard";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import CreateIssueForm from "@/components/kanban-board/column/CreateIssueForm";
import isEqual from "react-fast-compare";
import ColumnTitle from "@/components/kanban-board/column/ColumnTitle";

interface ColumnProps {
  column: TColumn;
  index: number;
}

const Column = React.memo(
  function Column({ column, index }: ColumnProps) {
    console.log(`${column.title} rendered`);
    return (
      <Draggable key={column.id} draggableId={column.id.toString()} index={index}>
        {(draggableProvided) => (
          <div
            className="group/[issue-form] group/[delete-form] mb-2 mr-4 flex min-w-[17rem] max-w-[17rem] flex-col rounded-sm bg-secondary shadow-md"
            ref={draggableProvided.innerRef}
            {...draggableProvided.draggableProps}
          >
            <div className="rounded-t-sm p-2 shadow-sm" {...draggableProvided.dragHandleProps}>
              <ColumnTitle column={column} />
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
