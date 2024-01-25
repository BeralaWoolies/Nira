"use client";

import { IssuesResponse } from "@/types/pocketbase-types";
import React from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Draggable } from "@hello-pangea/dnd";
import IssueContextMenu from "@/components/kanban-board/IssueContextMenu";

interface IssueCardProps {
  issue: IssuesResponse;
  index: number;
}

const IssueCard = React.memo(function IssueCard({ issue, index }: IssueCardProps) {
  return (
    <Draggable key={issue.id} draggableId={issue.id.toString()} index={index}>
      {(draggableProvided) => (
        <Card
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef}
          className="group/issue mb-1 flex min-h-[6rem] w-full rounded-sm border-none transition-colors hover:cursor-pointer hover:bg-accent-foreground/10"
        >
          <CardHeader className="w-full p-2">
            <div className="flex gap-2">
              <h1 className="line break-all text-sm hover:underline">{issue.title}</h1>
              <IssueContextMenu issue={issue} />
            </div>
          </CardHeader>
        </Card>
      )}
    </Draggable>
  );
});

export default IssueCard;
