"use client";

import React, { useRef } from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { TIssueForm, issueFormSchema } from "@/schemas/issue-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Issue } from "@/types/issue-types";
import toastKanbanResponse from "@/utils/toast-responses";
import { updateIssue } from "@/actions/kanban-board";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

interface IssueComboboxFormProps<T extends string, K extends keyof TIssueForm> {
  issue: Issue;
  formOptions: {
    items: Array<{
      value: T;
      label: string;
      icon: React.JSX.Element;
    }>;
    currentItemValue: T;
    name: K;
    defaultValues: { [key in K]: TIssueForm[K] };
    onUpdate: (newItem: T) => T;
  };
}

export default function IssueComboboxForm<T extends string, K extends keyof TIssueForm>({
  issue,
  formOptions: { items, currentItemValue, onUpdate, defaultValues, name },
}: IssueComboboxFormProps<T, K>) {
  const ref = useRef<HTMLFormElement | null>(null);

  const issueForm = useForm<TIssueForm>({
    resolver: zodResolver(issueFormSchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(values: TIssueForm) {
    toastKanbanResponse(await updateIssue(issue, values));
  }

  return (
    <Form {...issueForm}>
      <form onSubmit={issueForm.handleSubmit(onSubmit)} ref={ref}>
        <FormField
          control={issueForm.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Command>
                  <CommandInput placeholder="Search" />
                  <CommandEmpty>{`No issue ${name} found.`}</CommandEmpty>
                  <CommandGroup>
                    {items.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.label}
                        onSelect={() => {
                          field.onChange(onUpdate(item.value as T));
                          ref?.current?.requestSubmit();
                        }}
                        className="flex justify-between rounded-sm"
                      >
                        <div className="flex items-center gap-2">
                          {item.icon}
                          {item.label}
                        </div>
                        <Check
                          className={cn(
                            "h-4 w-4 shrink-0",
                            currentItemValue === item.value ? "opacity-100" : "opacity-0"
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
