import React from "react";
import { Issue } from "@/types/issue-types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import IssueComboboxForm from "@/components/kanban-board/issue/issue-dialog/IssueComboboxForm";

interface IssueAssigneeComboboxProps {
  issue: Issue;
  items: Array<{ value: string; label: string; icon: JSX.Element }>;
}

export default function IssueAssigneeCombobox({ issue, items }: IssueAssigneeComboboxProps) {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const assignee = items.find((assignee) => assignee.value === issue.assignee);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={popoverOpen}
          className={cn("w-fit max-w-[11rem] justify-start gap-2 rounded-sm p-2 font-normal")}
        >
          {issue.assignee ? (
            <>
              {assignee?.icon}
              <p className="truncate text-sm">{assignee?.label}</p>
            </>
          ) : (
            <p className="font-normal text-[#888]">Unassigned</p>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[11rem] rounded-sm p-0" align="start">
        <IssueComboboxForm
          issue={issue}
          formOptions={{
            items: items,
            currentItemValue: issue.assignee,
            name: "assignee",
            defaultValues: {
              assignee: issue.assignee,
            },
            onUpdate: (newAssignee) => {
              newAssignee = newAssignee === issue.assignee ? "" : newAssignee;
              setPopoverOpen(false);
              return newAssignee;
            },
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
