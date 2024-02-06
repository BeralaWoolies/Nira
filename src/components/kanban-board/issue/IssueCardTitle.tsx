"use client";

import React, { useState } from "react";
import EditIssueTitleForm from "@/components/kanban-board/issue/EditIssueTitleForm";
import IssueContextMenu from "@/components/kanban-board/issue/IssueContextMenu";
import PropagationWrapper from "@/components/PropagationWrapper";
import { Textarea } from "@/components/ui/textarea";
import EditingControl from "@/components/kanban-board/EditingControl";
import { Issue } from "@/types/issue-types";

interface IssueTitleProps {
  issue: Issue;
}

export default function IssueCardTitle({ issue }: IssueTitleProps) {
  const [editingMode, setEditingMode] = useState(false);

  if (!editingMode) {
    return (
      <>
        <h1 className="line break-all text-sm hover:underline">{issue.title}</h1>
        <PropagationWrapper>
          <IssueContextMenu issue={issue} openEditingMode={() => setEditingMode(true)} />
        </PropagationWrapper>
      </>
    );
  }

  return (
    <PropagationWrapper className="w-full">
      <EditIssueTitleForm
        issue={issue}
        closeEditingMode={() => setEditingMode(false)}
        editingControl={<EditingControl closeEditingMode={() => setEditingMode(false)} />}
      >
        <Textarea className="resize-none border-none bg-background shadow-none ring-accent-foreground" />
      </EditIssueTitleForm>
    </PropagationWrapper>
  );
}
