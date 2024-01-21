"use client";

import { IssuesResponse } from "@/types/pocketbase-types";
import React from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Draggable } from "@hello-pangea/dnd";

interface IssueCardProps {
  issue: IssuesResponse;
  index: number;
}

export default function IssueCard({ issue, index }: IssueCardProps) {
  return (
    <Draggable key={issue.id} draggableId={issue.id.toString()} index={index}>
      {(draggableProvided) => (
        <Card
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef}
          className="mb-1 h-[90px] w-[260px] rounded-md border-none"
        >
          <CardHeader className="p-2 text-sm">{issue.title}</CardHeader>
        </Card>
      )}
    </Draggable>
  );
}
