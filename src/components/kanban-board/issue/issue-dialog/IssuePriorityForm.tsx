"use client";

import React, { useRef } from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { TIssueForm, issueFormSchema } from "@/schemas/issue-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import toastKanbanResponse from "@/utils/toast-responses";
import { updateIssue } from "@/actions/kanban-board";
import { Issue, IssuePriority } from "@/types/issue-types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

interface IssuePriorityFormProps {
  issue: Issue;
  issuePriorities: Array<{
    value: IssuePriority;
    label: string;
    icon: React.JSX.Element;
  }>;
  currentPriority: string;
  updatePriority: (newPriority: IssuePriority) => void;
  closePopover: () => void;
}

export default function IssuePriorityForm({
  issue,
  issuePriorities,
  currentPriority,
  updatePriority,
  closePopover,
}: IssuePriorityFormProps) {
  const ref = useRef<HTMLFormElement | null>(null);

  const issueForm = useForm<TIssueForm>({
    resolver: zodResolver(issueFormSchema),
    defaultValues: {
      priority: issue.priority,
    },
  });

  async function onSubmit(values: TIssueForm) {
    toastKanbanResponse(await updateIssue(issue, values));
  }

  return (
    <Form {...issueForm}>
      <form onSubmit={issueForm.handleSubmit(onSubmit)} ref={ref}>
        <FormField
          control={issueForm.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Command>
                  <CommandInput placeholder="Search" />
                  <CommandEmpty>No priority found.</CommandEmpty>
                  <CommandGroup>
                    {issuePriorities.map((p) => (
                      <CommandItem
                        key={p.value}
                        value={p.value}
                        onSelect={(newPriority) => {
                          updatePriority(newPriority as IssuePriority);
                          closePopover();
                          field.onChange(newPriority === currentPriority ? "" : newPriority);
                          ref?.current?.requestSubmit();
                        }}
                        className="flex justify-between rounded-sm"
                      >
                        <div className="flex items-center gap-2">
                          {p.icon}
                          {p.label}
                        </div>
                        <Check
                          className={cn(
                            "h-4 w-4 shrink-0",
                            currentPriority === p.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
