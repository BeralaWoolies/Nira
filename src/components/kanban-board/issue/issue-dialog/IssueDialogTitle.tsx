"use client";

import React, { useState } from "react";
import EditIssueTitleForm from "@/components/kanban-board/issue/EditIssueTitleForm";
import { Input } from "@/components/ui/input";
import { DialogTitle } from "@/components/ui/dialog";
import { IssuesResponse } from "@/types/pocketbase-types";
import EditingControl from "@/components/kanban-board/EditingControl";

interface IssueDialogTitleProps {
  issue: IssuesResponse;
}

export default function IssueDialogTitle({ issue }: IssueDialogTitleProps) {
  const [editingMode, setEditingMode] = useState(false);

  if (!editingMode) {
    return (
      <DialogTitle
        className="rounded-sm p-2 text-2xl hover:cursor-text hover:bg-accent-foreground/10"
        onClick={() => setEditingMode(true)}
      >
        {issue.title}
      </DialogTitle>
    );
  }

  return (
    <EditIssueTitleForm
      issue={issue}
      closeEditingMode={() => setEditingMode(false)}
      editingControl={
        <div className="absolute right-0">
          <EditingControl closeEditingMode={() => setEditingMode(false)} />
        </div>
      }
    >
      <Input className="resize-none rounded-sm border-none bg-background text-2xl font-semibold shadow-none ring-accent-foreground focus-visible:ring-2" />
    </EditIssueTitleForm>
  );
}
