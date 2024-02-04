"use client";

import React, { useRef } from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { TIssueForm, issueFormSchema } from "@/schemas/issue-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { IssuesResponse } from "@/types/pocketbase-types";
import { IssueType } from "@/types/issue-types";
import toastKanbanResponse from "@/utils/toast-responses";
import { updateIssue } from "@/actions/kanban-board";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

interface IssueTypeFormProps {
  issue: IssuesResponse;
  issueTypes: Array<{
    value: IssueType;
    label: string;
    icon: React.JSX.Element;
  }>;
  currentIssueType: string;
  updateIssueType: (newIssueType: IssueType) => void;
  closePopover: () => void;
}

export default function IssueTypeForm({
  issue,
  issueTypes,
  currentIssueType,
  updateIssueType,
  closePopover,
}: IssueTypeFormProps) {
  const ref = useRef<HTMLFormElement | null>(null);

  const issueForm = useForm<TIssueForm>({
    resolver: zodResolver(issueFormSchema),
    defaultValues: {
      type: issue.type,
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
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Command>
                  <CommandInput placeholder="Search" />
                  <CommandEmpty>No issue type found.</CommandEmpty>
                  <CommandGroup>
                    {issueTypes.map((issueType) => (
                      <CommandItem
                        key={issueType.value}
                        value={issueType.value}
                        onSelect={(newIssueType) => {
                          updateIssueType(newIssueType as IssueType);
                          closePopover();
                          field.onChange(newIssueType);
                          ref?.current?.requestSubmit();
                        }}
                        className="flex justify-between rounded-sm"
                      >
                        <div className="flex items-center gap-2">
                          {issueType.icon}
                          {issueType.label}
                        </div>
                        <Check
                          className={cn(
                            "h-4 w-4 shrink-0",
                            currentIssueType === issueType.value ? "opacity-100" : "opacity-0"
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
