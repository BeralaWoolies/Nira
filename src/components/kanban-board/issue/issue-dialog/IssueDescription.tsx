"use client";

import { IssuesResponse } from "@/types/pocketbase-types";
import React, { useState } from "react";
import EditIssueDescriptionForm from "@/components/kanban-board/issue/issue-dialog/EditIssueDescriptionForm";
import EditorPreview from "@/components/editor/EditorPreview";

interface IssueDescriptionProps {
  issue: IssuesResponse;
}

export default function IssueDescription({ issue }: IssueDescriptionProps) {
  const [editingMode, setEditingMode] = useState(false);

  if (!editingMode) {
    return (
      <div
        className="rounded-sm p-2 hover:bg-accent-foreground/10"
        onClick={() => setEditingMode(true)}
      >
        <EditorPreview description={issue.description} />
      </div>
    );
  }

  return <EditIssueDescriptionForm issue={issue} closeEditingMode={() => setEditingMode(false)} />;
}
