"use client";

import { IssuesResponse } from "@/types/pocketbase-types";
import React, { useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Draggable } from "@hello-pangea/dnd";
import IssueTitle from "@/components/kanban-board/issue/IssueTitle";
import isEqual from "react-fast-compare";
import IssueDialog from "@/components/kanban-board/issue/issue-dialog/IssueDialog";

interface IssueCardProps {
  issue: IssuesResponse;
  index: number;
}

const IssueCard = React.memo(
  function IssueCard({ issue, index }: IssueCardProps) {
    console.log(`${issue.title} rendered`);
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
      <Draggable key={issue.id} draggableId={issue.id.toString()} index={index}>
        {(draggableProvided) => (
          <>
            <Card
              {...draggableProvided.draggableProps}
              {...draggableProvided.dragHandleProps}
              ref={draggableProvided.innerRef}
              className="group/issue mb-1 flex min-h-[6rem] w-full rounded-sm border-none transition-colors hover:cursor-pointer hover:bg-accent-foreground/10"
              onClick={() => setDialogOpen(true)}
            >
              <CardHeader className="w-full p-2">
                <div className="flex gap-2">
                  <IssueTitle issue={issue} />
                </div>
              </CardHeader>
            </Card>
            <IssueDialog open={dialogOpen} issue={issue} closeDialog={() => setDialogOpen(false)} />
          </>
        )}
      </Draggable>
    );
  },
  function propsAreEqual(prevProps, nextProps) {
    return prevProps.index === nextProps.index && isEqual(prevProps.issue, nextProps.issue);
  }
);

export default IssueCard;
