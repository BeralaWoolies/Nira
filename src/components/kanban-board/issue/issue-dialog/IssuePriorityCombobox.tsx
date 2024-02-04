"use client";

import React from "react";
import { MessageCircleXIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import IssuePriorityForm from "@/components/kanban-board/issue/issue-dialog/IssuePriorityForm";
import { IssuesResponse } from "@/types/pocketbase-types";
import { IssuePriority } from "@/types/issue-types";

const priorities: Array<{
  value: IssuePriority;
  label: string;
  color: string;
}> = [
  {
    value: "highest",
    label: "Highest",
    color: "stroke-red-700",
  },
  {
    value: "high",
    label: "High",
    color: "stroke-red-500",
  },
  {
    value: "medium",
    label: "Medium",
    color: "stroke-orange-500",
  },
  {
    value: "low",
    label: "Low",
    color: "stroke-green-600",
  },
  {
    value: "lowest",
    label: "Lowest",
    color: "stroke-green-500",
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
            "justify-start gap-1 p-1 font-normal",
            currentPriority ? "w-[5.5rem]" : "w-fit"
          )}
        >
          {currentPriority ? (
            <>
              <MessageCircleXIcon
                className={cn(
                  "h-4 w-4 shrink-0",
                  priorities.find((p) => p.value === currentPriority)?.color
                )}
              />
              {priorities.find((p) => p.value === currentPriority)?.label}
            </>
          ) : (
            <p className="font-normal text-[#888]">No priority</p>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <IssuePriorityForm
          issue={issue}
          priorities={priorities}
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
