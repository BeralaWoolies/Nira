"use client";

import React, { useState } from "react";
import EditIssueDescriptionForm from "@/components/kanban-board/issue/issue-dialog/EditIssueDescriptionForm";
import EditorPreview from "@/components/editor/EditorPreview";
import { Issue } from "@/types/issue-types";

interface IssueDescriptionProps {
  issue: Issue;
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
