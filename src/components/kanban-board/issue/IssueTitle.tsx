"use client";

import React, { useState } from "react";
import { IssuesResponse } from "@/types/pocketbase-types";
import EditIssueTitleForm from "@/components/kanban-board/issue/EditIssueTitleForm";
import IssueContextMenu from "@/components/kanban-board/issue/IssueContextMenu";
import PropagationWrapper from "@/components/PropagationWrapper";

interface IssueTitleProps {
  issue: IssuesResponse;
}

export default function IssueTitle({ issue }: IssueTitleProps) {
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
      <EditIssueTitleForm issue={issue} closeEditingMode={() => setEditingMode(false)} />
    </PropagationWrapper>
  );
}
