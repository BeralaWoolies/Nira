"use client";

import { IssuesResponse } from "@/types/pocketbase-types";
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import IssueDescription from "@/components/kanban-board/issue/issue-dialog/IssueDescription";
import IssueDialogTitle from "@/components/kanban-board/issue/issue-dialog/IssueDialogTitle";
import { IssuePriorityCombobox } from "@/components/kanban-board/issue/issue-dialog/IssuePriorityCombobox";
import { IssueTypeCombobox } from "@/components/kanban-board/issue/issue-dialog/IssueTypeCombobox";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";

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
          <div className="col-span-3 flex flex-col gap-4 overflow-y-auto p-2">
            <IssueTypeCombobox issue={issue} />
            <IssueDialogTitle issue={issue} />
            <div className="flex flex-1 flex-col gap-1">
              <h2 className="mb-1 pl-2 font-semibold">Description</h2>
              <IssueDescription issue={issue} />
            </div>
          </div>
          <div className="col-span-2 flex flex-col justify-between">
            <div>
              <h2 className="mb-1 mt-[4.5rem] pl-1 font-semibold">Priority</h2>
              <IssuePriorityCombobox issue={issue} />
            </div>
            <div className="flex items-center gap-2 text-xs">
              <CalendarIcon className="h-6 w-6 shrink-0" />
              <div className="space-y-1">
                <p>{`Created ${format(issue.created, "MMMM d, yyyy 'at' h:mm aaa")}`}</p>
                <p>{`Updated ${format(issue.updated, "MMMM d, yyyy 'at' h:mm aaa")}`}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
