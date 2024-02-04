"use client";

import React, { useRef } from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { TIssueForm, issueFormSchema } from "@/schemas/issue-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, MessageCircleXIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import toastKanbanResponse from "@/utils/toast-responses";
import { updateIssue } from "@/actions/kanban-board";
import { IssuesResponse } from "@/types/pocketbase-types";
import { IssuePriority } from "@/types/issue-types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

interface IssuePriorityFormProps {
  issue: IssuesResponse;
  priorities: Array<{
    value: IssuePriority;
    label: string;
    color: string;
  }>;
  currentPriority: string;
  updatePriority: (newPriority: IssuePriority) => void;
  closePopover: () => void;
}

export default function IssuePriorityForm({
  issue,
  priorities,
  currentPriority,
  updatePriority,
  closePopover,
}: IssuePriorityFormProps) {
  const ref = useRef<HTMLFormElement | null>(null);

  const issueForm = useForm<TIssueForm>({
    resolver: zodResolver(issueFormSchema),
    defaultValues: {
      priority: "",
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
                    {priorities.map((p) => (
                      <CommandItem
                        key={p.value}
                        value={p.value}
                        onSelect={(newPriority) => {
                          updatePriority(newPriority as IssuePriority);
                          closePopover();
                          field.onChange(newPriority === currentPriority ? "" : newPriority);
                          ref?.current?.requestSubmit();
                        }}
                        className="flex justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <MessageCircleXIcon className={cn("h-4 w-4 shrink-0", p.color)} />
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
