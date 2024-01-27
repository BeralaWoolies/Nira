"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormControl, FormField, FormItem, Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import useSubmitOnKey from "@/hooks/useSubmitOnKey";
import { TIssueForm, issueFormSchema } from "@/schemas/issue-form";
import { updateIssue } from "@/actions/kanban-board";
import { IssuesResponse } from "@/types/pocketbase-types";
import toastKanbanResponse from "@/utils/toast-responses";

interface EditIssueTitleFormProps {
  issue: IssuesResponse;
  setEditingMode: (editingMode: boolean) => void;
}

export default function EditIssueTitleForm({ issue, setEditingMode }: EditIssueTitleFormProps) {
  const [ref, onKeyDown] = useSubmitOnKey();

  const issueForm = useForm<TIssueForm>({
    resolver: zodResolver(issueFormSchema),
    defaultValues: {
      title: issue.title,
    },
  });

  useEffect(() => {
    issueForm.reset({
      title: issue.title,
    });
  }, [issue, issueForm]);

  async function onSubmit(values: TIssueForm) {
    toastKanbanResponse(await updateIssue(issue, values));
    setEditingMode(false);
  }

  return (
    <Form {...issueForm}>
      <form
        onSubmit={issueForm.handleSubmit(onSubmit)}
        ref={ref}
        onKeyDown={onKeyDown}
        className="w-full"
      >
        <FormField
          control={issueForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  spellCheck={false}
                  className="resize-none border-none shadow-none ring-2 ring-accent-foreground"
                  {...field}
                  autoFocus
                  onBlur={() => {
                    setEditingMode(false);
                    issueForm.reset();
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
