"use client";

import React from "react";
import Editor from "@/components/editor/Editor";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TIssueForm, issueFormSchema } from "@/schemas/issue-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import toastKanbanResponse from "@/utils/toast-responses";
import { updateIssue } from "@/actions/kanban-board";
import { Issue } from "@/types/issue-types";

interface EditIssueDescriptionFormProps {
  issue: Issue;
  closeEditingMode: () => void;
}

export default function EditIssueDescriptionForm({
  issue,
  closeEditingMode,
}: EditIssueDescriptionFormProps) {
  const issueForm = useForm<TIssueForm>({
    resolver: zodResolver(issueFormSchema),
    defaultValues: {
      description: issue.description,
    },
  });

  async function onSubmit(values: TIssueForm) {
    toastKanbanResponse(await updateIssue(issue, values));
    closeEditingMode();
  }

  return (
    <>
      <Form {...issueForm}>
        <form onSubmit={issueForm.handleSubmit(onSubmit)}>
          <FormField
            control={issueForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Editor description={field.value || ""} onChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="mt-3 flex gap-2">
            <Button type="submit" className="rounded-sm">
              Save
            </Button>
            <Button type="reset" className="rounded-sm" variant="ghost" onClick={closeEditingMode}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
