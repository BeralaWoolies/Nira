"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import toastKanbanResponse from "@/utils/toast-responses";
import { deleteIssue } from "@/actions/kanban-board";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { IssuesResponse } from "@/types/pocketbase-types";

interface IssueContextMenuProps {
  issue: IssuesResponse;
  setEditingMode: (editingMode: boolean) => void;
}

export default function IssueContextMenu({ issue, setEditingMode }: IssueContextMenuProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Pencil1Icon className="mt-[0.1rem] min-h-4 min-w-4 rounded-full opacity-0 hover:ring-4 hover:ring-accent-foreground/20 group-hover/issue:opacity-100" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="absolute bottom-0 left-6">
          <DropdownMenuItem className="cursor-pointer" onClick={() => setEditingMode(true)}>
            Edit
          </DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>You are about to delete issue: {issue.title}</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <Button
          variant="destructive"
          onClick={async () => toastKanbanResponse(await deleteIssue(issue))}
        >
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
}