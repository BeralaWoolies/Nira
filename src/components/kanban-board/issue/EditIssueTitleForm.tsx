"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormControl, FormField, FormItem, Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSubmitOnKey from "@/hooks/useSubmitOnKey";
import { TIssueForm, issueFormSchema } from "@/schemas/issue-form";
import { updateIssue } from "@/actions/kanban-board";
import toastKanbanResponse from "@/utils/toast-responses";
import { Issue } from "@/types/issue-types";

interface EditIssueTitleFormProps {
  issue: Issue;
  closeEditingMode: () => void;
  children: React.JSX.Element;
  editingControl: React.JSX.Element;
}

export default function EditIssueTitleForm({
  issue,
  closeEditingMode,
  children,
  editingControl,
}: EditIssueTitleFormProps) {
  const inputElement = React.Children.only(children);
  const additionalProps = {
    spellCheck: false,
    autoFocus: true,
    onBlur: () => {
      closeEditingMode();
      issueForm.reset();
    },
  };
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
    closeEditingMode();
  }

  return (
    <Form {...issueForm}>
      <form
        onSubmit={issueForm.handleSubmit(onSubmit)}
        ref={ref}
        onKeyDown={onKeyDown}
        className="relative w-full space-y-2"
      >
        <FormField
          control={issueForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {React.cloneElement(inputElement, {
                  ...field,
                  ...additionalProps,
                })}
              </FormControl>
            </FormItem>
          )}
        />
        {editingControl}
      </form>
    </Form>
  );
}
