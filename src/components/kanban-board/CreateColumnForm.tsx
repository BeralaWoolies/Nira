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
      className="group mb-4 mr-4 flex max-h-[78dvh] min-h-[540px] min-w-[270px] flex-col rounded-sm bg-secondary p-1 shadow-md"
      ref={onColumnVisible}
    >
      <Form {...columnForm}>
        <form onSubmit={columnForm.handleSubmit(onSubmit)} ref={ref}>
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
          <div className="mt-2 flex justify-end gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="bg-primary-foreground shadow-lg"
              onMouseDown={(e) => e.preventDefault()}
            >
              <CheckIcon className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="bg-primary-foreground shadow-lg"
              onClick={() => setEditingMode(false)}
            >
              <Cross2Icon className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
});

export default CreateColumnForm;
