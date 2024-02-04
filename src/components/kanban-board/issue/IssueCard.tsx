"use client";

import { IssuesResponse } from "@/types/pocketbase-types";
import React, { useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Draggable } from "@hello-pangea/dnd";
import IssueCardTitle from "@/components/kanban-board/issue/IssueCardTitle";
import isEqual from "react-fast-compare";
import IssueDialog from "@/components/kanban-board/issue/issue-dialog/IssueDialog";
import { issueTypes } from "@/components/kanban-board/issue/issue-dialog/IssueTypeCombobox";
import { issuePriorities } from "@/components/kanban-board/issue/issue-dialog/IssuePriorityCombobox";
import IssueIconTooltip from "@/components/kanban-board/issue/IssueIconTooltip";

interface IssueCardProps {
  issue: IssuesResponse;
  index: number;
}

const IssueCard = React.memo(
  function IssueCard({ issue, index }: IssueCardProps) {
    console.log(`${issue.title} rendered`);
    const [dialogOpen, setDialogOpen] = useState(false);

    const issueType = issueTypes.find((issueType) => issueType.value === issue.type);
    const issuePriority = issuePriorities.find((priority) => priority.value === issue.priority);

    return (
      <Draggable key={issue.id} draggableId={issue.id.toString()} index={index}>
        {(draggableProvided) => (
          <>
            <Card
              {...draggableProvided.draggableProps}
              {...draggableProvided.dragHandleProps}
              ref={draggableProvided.innerRef}
              className="group/issue mb-1 flex min-h-[6rem] w-full flex-col justify-between rounded-sm border-none p-2 transition-colors hover:cursor-pointer hover:bg-accent-foreground/10 has-[:hover.issue-icon]:hover:bg-background"
              onClick={() => setDialogOpen(true)}
            >
              <CardHeader className="w-full p-0">
                <div className="flex gap-2">
                  <IssueCardTitle issue={issue} />
                </div>
              </CardHeader>
              <div className="flex gap-1">
                {issueType && (
                  <IssueIconTooltip className="issue-icon" content={issueType.label}>
                    {issueType.icon}
                  </IssueIconTooltip>
                )}
                {issuePriority && (
                  <IssueIconTooltip
                    className="issue-icon"
                    content={`${issuePriority.label} priority`}
                  >
                    {issuePriority.icon}
                  </IssueIconTooltip>
                )}
              </div>
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
