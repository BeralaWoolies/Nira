"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TIssueForm, issueFormSchema } from "@/schemas/issue-form";
import { createIssue } from "@/actions/kanban-board";
import toastStatusResponse from "@/utils/toast-responses";
import useScrollIntoView from "@/hooks/useScrollIntoView";
import useSubmitOnKey from "@/hooks/useSubmitOnKey";

interface CreateIssueFormProps {
  columnId: string;
}

const CreateIssueForm = React.memo(function CreateIssueForm({ columnId }: CreateIssueFormProps) {
  const [editingMode, setEditingMode] = useState(false);
  const [ref, onKeyDown] = useSubmitOnKey();
  const onCardVisible = useScrollIntoView();

  const issueForm = useForm<TIssueForm>({
    resolver: zodResolver(issueFormSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: TIssueForm) {
    toastStatusResponse(await createIssue(columnId, values));
    issueForm.reset();
    setEditingMode(false);
  }

  if (!editingMode) {
    return (
      <Button
        className="w-full justify-start rounded-sm p-0 pl-1 opacity-0 transition-all hover:bg-accent-foreground/10 group-hover/[issue-form]:opacity-100"
        variant="ghost"
        onClick={() => setEditingMode(true)}
      >
        <PlusIcon className="mr-1 h-5 w-5" />
        Create issue
      </Button>
    );
  }

  return (
    <Card
      className="min-h-[6rem] w-full rounded-sm border-none ring-2 ring-accent-foreground"
      ref={onCardVisible}
    >
      <Form {...issueForm}>
        <form onSubmit={issueForm.handleSubmit(onSubmit)} ref={ref} onKeyDown={onKeyDown}>
          <FormField
            control={issueForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    spellCheck={false}
                    className="resize-none border-none shadow-none focus-visible:ring-0"
                    {...field}
                    autoFocus
                    onBlur={() => setEditingMode(false)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Card>
  );
});

export default CreateIssueForm;
