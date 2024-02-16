import { Issue } from "@/types/issue-types";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import IssueComboboxForm from "@/components/kanban-board/issue/issue-dialog/IssueComboboxForm";
import UserAvatar from "@/components/UserAvatar";

interface IssueReporterComboboxProps {
  issue: Issue;
  items: Array<{ value: string; label: string; icon: JSX.Element }>;
}

export default function IssueReporterCombobox({ issue, items }: IssueReporterComboboxProps) {
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={popoverOpen}
          className={cn("w-fit max-w-[11rem] justify-start gap-2 rounded-sm p-2 font-normal")}
        >
          {issue.reporter ? (
            <>
              <UserAvatar user={issue.expand!.reporter} className="h-7 w-7 hover:ring-0" />
              <p className="truncate text-sm">{issue.expand!.reporter.username}</p>
            </>
          ) : (
            <p className="font-normal text-[#888]">No reporter</p>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[11rem] rounded-sm p-0" align="start">
        <IssueComboboxForm
          issue={issue}
          formOptions={{
            items: items,
            currentItemValue: issue.reporter,
            name: "reporter",
            defaultValues: {
              reporter: issue.reporter,
            },
            onUpdate: (newReporter) => {
              setPopoverOpen(false);
              return newReporter;
            },
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
