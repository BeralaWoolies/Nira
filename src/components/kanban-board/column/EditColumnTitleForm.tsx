"use client";

import React, { useEffect } from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { TColumnForm, columnFormSchema } from "@/schemas/column-form";
import toastKanbanResponse from "@/utils/toast-responses";
import EditingControl from "@/components/kanban-board/EditingControl";
import { updateColumn } from "@/actions/kanban-board";
import { Column } from "@/types/column-types";

interface EditColumnTitleFormProps {
  column: Column;
  closeEditingMode: () => void;
}

export default function EditColumnTitleForm({
  column,
  closeEditingMode,
}: EditColumnTitleFormProps) {
  const columnForm = useForm<TColumnForm>({
    resolver: zodResolver(columnFormSchema),
    defaultValues: {
      title: column.title,
    },
  });

  useEffect(() => {
    columnForm.reset({
      title: column.title,
    });
  }, [column, columnForm]);

  async function onSubmit(values: TColumnForm) {
    toastKanbanResponse(await updateColumn(column, values));
    closeEditingMode();
  }

  return (
    <Form {...columnForm}>
      <form onSubmit={columnForm.handleSubmit(onSubmit)} className="relative space-y-2">
        <FormField
          control={columnForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  autoFocus
                  onBlur={closeEditingMode}
                  className="h-[1.95rem] w-full rounded-sm border-none bg-background shadow-none focus-visible:ring-2"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="absolute right-0">
          <EditingControl closeEditingMode={closeEditingMode} />
        </div>
      </form>
    </Form>
  );
}
