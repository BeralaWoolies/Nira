"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import IssuePriorityForm from "@/components/kanban-board/issue/issue-dialog/IssuePriorityForm";
import { IssuesResponse } from "@/types/pocketbase-types";
import { IssuePriority } from "@/types/issue-types";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

export const issuePriorities: Array<{
  value: IssuePriority;
  label: string;
  icon: React.JSX.Element;
}> = [
  {
    value: "highest",
    label: "Highest",
    icon: <ArrowUpIcon className="h-5 w-5 shrink-0 stroke-red-700" />,
  },
  {
    value: "high",
    label: "High",
    icon: <ArrowUpIcon className="h-5 w-5 shrink-0 stroke-red-500" />,
  },
  {
    value: "medium",
    label: "Medium",
    icon: <ArrowUpIcon className="h-5 w-5 shrink-0 stroke-orange-500" />,
  },
  {
    value: "low",
    label: "Low",
    icon: <ArrowDownIcon className="h-5 w-5 shrink-0 stroke-green-700" />,
  },
  {
    value: "lowest",
    label: "Lowest",
    icon: <ArrowDownIcon className="h-5 w-5 shrink-0 stroke-lime-500" />,
  },
];

interface IssuePriorityComboboxProps {
  issue: IssuesResponse;
}

export function IssuePriorityCombobox({ issue }: IssuePriorityComboboxProps) {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [currentPriority, setCurrentPriority] = React.useState<IssuePriority | "">(issue.priority);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={popoverOpen}
          className={cn(
            "justify-start gap-1 rounded-sm p-1 font-normal",
            currentPriority ? "w-[5.5rem]" : "w-fit"
          )}
        >
          {currentPriority ? (
            <>
              {issuePriorities.find((p) => p.value === currentPriority)?.icon}
              {issuePriorities.find((p) => p.value === currentPriority)?.label}
            </>
          ) : (
            <p className="font-normal text-[#888]">No priority</p>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[10rem] rounded-sm p-0" align="start">
        <IssuePriorityForm
          issue={issue}
          issuePriorities={issuePriorities}
          currentPriority={currentPriority}
          updatePriority={(newPriority) =>
            setCurrentPriority(newPriority === currentPriority ? "" : newPriority)
          }
          closePopover={() => setPopoverOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
}
