"use client";

import { IssuesResponse } from "@/types/pocketbase-types";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import IssueDescription from "@/components/kanban-board/issue/issue-dialog/IssueDescription";

interface IssueDialogProps {
  issue: IssuesResponse;
  open: boolean;
  closeDialog: () => void;
}

export default function IssueDialog({ issue, open, closeDialog }: IssueDialogProps) {
  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="h-[40rem] focus-visible:outline-none lg:min-w-[65rem]">
        <div className="grid grid-cols-5 gap-10 overflow-y-auto">
          <div className="col-span-3 flex flex-col gap-4 overflow-y-auto px-2">
            <div className="w-fit rounded-sm p-2 hover:bg-accent-foreground/10">
              <p className="text-sm">{`Issue-${issue.id}`}</p>
            </div>
            <DialogTitle className="rounded-sm p-2 text-2xl hover:cursor-text hover:bg-accent-foreground/10">
              {issue.title}
            </DialogTitle>
            <div className="flex flex-1 flex-col gap-1">
              <h2 className="mb-1 pl-2 font-semibold">Description</h2>
              <IssueDescription issue={issue} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
