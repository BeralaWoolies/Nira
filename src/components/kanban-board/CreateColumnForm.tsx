"use client";

import React, { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, PlusIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { TColumnForm, columnFormSchema } from "@/schemas/column-form";
import { createColumn } from "@/actions/kanban-board";
import toastKanbanResponse from "@/utils/toast-responses";
import useScrollIntoView from "@/hooks/useScrollIntoView";
import EditingControl from "@/components/kanban-board/EditingControl";

interface CreateColumnForm {
  boardId: string;
}

const CreateColumnForm = React.memo(function CreateColumnForm({ boardId }: CreateColumnForm) {
  console.log("Column form rendered");

  const [editingMode, setEditingMode] = useState(false);
  const ref = useRef<HTMLFormElement>(null);
  const onColumnVisible = useScrollIntoView();

  const columnForm = useForm<TColumnForm>({
    resolver: zodResolver(columnFormSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: TColumnForm) {
    toastKanbanResponse(await createColumn(boardId, values));
    setEditingMode(false);
  }

  if (!editingMode) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setEditingMode(true);
              columnForm.reset();
            }}
          >
            <PlusIcon className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="absolute right-8 top-1.5 whitespace-nowrap">
          Create Column
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <div
      className="mb-2 mr-4 min-w-[17rem] flex-col rounded-sm bg-secondary p-1 shadow-md"
      ref={onColumnVisible}
    >
      <Form {...columnForm}>
        <form onSubmit={columnForm.handleSubmit(onSubmit)} ref={ref} className="space-y-2">
          <FormField
            control={columnForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    autoFocus
                    onBlur={() => setEditingMode(false)}
                    className="h-[1.95rem] w-full rounded-sm border-none bg-background shadow-none focus-visible:ring-2"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <EditingControl setEditingMode={setEditingMode} />
        </form>
      </Form>
    </div>
  );
});

export default CreateColumnForm;
