"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TIssueForm, issueFormSchema } from "@/schemas/issue-form";
import { createIssue } from "@/actions/kanban-board";
import toastKanbanResponse from "@/utils/toast-responses";
import useScrollIntoView from "@/hooks/useScrollIntoView";

interface CreateIssueFormProps {
  columnId: string;
}

const CreateIssueForm = React.memo(function CreateIssueForm({ columnId }: CreateIssueFormProps) {
  console.log("Rendered form", columnId);
  const [editingMode, setEditingMode] = useState(false);
  const ref = useRef<HTMLFormElement>(null);
  const onCardVisible = useScrollIntoView();

  const issueForm = useForm<TIssueForm>({
    resolver: zodResolver(issueFormSchema),
    defaultValues: {
      title: "",
    },
  });

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
      ref.current?.requestSubmit();
    }
  }

  async function onSubmit(values: TIssueForm) {
    toastKanbanResponse(await createIssue(columnId, values));
    issueForm.reset();
    setEditingMode(false);
  }

  if (!editingMode) {
    return (
      <Button
        className="invisible w-full rounded-sm opacity-0 transition-opacity duration-500 hover:bg-accent-foreground/10 group-hover:visible group-hover:opacity-100"
        variant="ghost"
        onClick={() => setEditingMode(true)}
      >
        <PlusIcon className="h-5 w-5" />
        Create issue
      </Button>
    );
  }

  return (
    <Card className="h-[90px] w-full" ref={onCardVisible}>
      <Form {...issueForm}>
        <form onSubmit={issueForm.handleSubmit(onSubmit)} ref={ref}>
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
                    onKeyDown={onKeyDown}
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
