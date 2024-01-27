"use client";

import React, { useState } from "react";
import { IssuesResponse } from "@/types/pocketbase-types";
import EditIssueTitleForm from "@/components/kanban-board/issue/EditIssueTitleForm";
import IssueContextMenu from "@/components/kanban-board/issue/IssueContextMenu";

interface IssueTitleProps {
  issue: IssuesResponse;
}

export default function IssueTitle({ issue }: IssueTitleProps) {
  const [editingMode, setEditingMode] = useState(false);

  if (!editingMode) {
    return (
      <>
        <h1 className="line break-all text-sm hover:underline">{issue.title}</h1>
        <IssueContextMenu issue={issue} setEditingMode={setEditingMode} />
      </>
    );
  }

  return <EditIssueTitleForm issue={issue} setEditingMode={setEditingMode} />;
}
