import { Issue } from "@/types/issue-types";
import { useAtomValue } from "jotai";
import React, { useMemo } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import IssueComboboxForm from "@/components/kanban-board/issue/issue-dialog/IssueComboboxForm";
import UserAvatar from "@/components/UserAvatar";
import { membersAtom } from "@/store/atoms";

interface IssueReporterComboboxProps {
  issue: Issue;
}

export default function IssueReporterCombobox({ issue }: IssueReporterComboboxProps) {
  const members = useAtomValue(membersAtom);
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [currentReporter, setCurrentReporter] = React.useState(issue.reporter);

  const items = useMemo(
    () =>
      members.map((member) => ({
        value: member.id,
        label: member.username,
        icon: <UserAvatar user={member} className="h-7 w-7 hover:ring-0" />,
      })),
    [members]
  );

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={popoverOpen}
          className={cn("w-fit max-w-[11rem] justify-start gap-2 rounded-sm p-2 font-normal")}
        >
          {currentReporter ? (
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
            currentItemValue: currentReporter,
            name: "reporter",
            defaultValues: {
              reporter: issue.reporter,
            },
            onUpdate: (newReporter) => {
              setCurrentReporter(newReporter);
              setPopoverOpen(false);
              return newReporter;
            },
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
