"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IssuesResponse } from "@/types/pocketbase-types";
import { IssueType } from "@/types/issue-types";
import CheckSquareIcon from "@/components/icons/CheckSquareIcon";
import AlertCircleIcon from "@/components/icons/AlertCircleIcon";
import { BookmarkIcon } from "lucide-react";
import IssueTypeForm from "@/components/kanban-board/issue/issue-dialog/IssueTypeForm";

export const issueTypes: Array<{
  value: IssueType;
  label: string;
  icon: React.JSX.Element;
}> = [
  {
    value: "task",
    label: "Task",
    icon: <CheckSquareIcon className="h-5 w-5 shrink-0 fill-blue-400 stroke-white" />,
  },
  {
    value: "bug",
    label: "Bug",
    icon: <AlertCircleIcon className="h-5 w-5 shrink-0 fill-red-500 stroke-white" />,
  },
  {
    value: "story",
    label: "Story",
    icon: <BookmarkIcon className="h-5 w-5 shrink-0 fill-lime-500 stroke-none" />,
  },
];

interface IssuePriorityComboboxProps {
  issue: IssuesResponse;
}

export function IssueTypeCombobox({ issue }: IssuePriorityComboboxProps) {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [currentIssueType, setCurrentIssueType] = React.useState<IssueType>(issue.type);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={popoverOpen}
          className={cn("w-fit justify-start gap-1 rounded-sm p-2 font-normal")}
        >
          {currentIssueType ? (
            <>
              {issueTypes.find((p) => p.value === currentIssueType)?.icon}
              <p className="text-sm">{`Issue-${issue.id}`}</p>
            </>
          ) : (
            <p className="font-normal text-[#888]">No issue type</p>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[10rem] rounded-sm p-0" align="start">
        <IssueTypeForm
          issue={issue}
          issueTypes={issueTypes}
          currentIssueType={currentIssueType}
          updateIssueType={(newIssueType) => setCurrentIssueType(newIssueType)}
          closePopover={() => setPopoverOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
}
