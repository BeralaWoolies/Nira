"use client";

import React, { useEffect } from "react";
import { ColumnsResponse } from "@/types/pocketbase-types";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { TColumnForm, columnFormSchema } from "@/schemas/column-form";
import toastKanbanResponse from "@/utils/toast-responses";
import EditingControl from "@/components/kanban-board/EditingControl";
import { updateColumn } from "@/actions/kanban-board";

interface EditColumnTitleFormProps {
  column: ColumnsResponse;
  setEditingMode: (editingMode: boolean) => void;
}

export default function EditColumnTitleForm({ column, setEditingMode }: EditColumnTitleFormProps) {
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
    setEditingMode(false);
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
                  onBlur={() => setEditingMode(false)}
                  className="h-[1.95rem] w-full rounded-sm border-none bg-background shadow-none focus-visible:ring-2"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="absolute right-0">
          <EditingControl setEditingMode={setEditingMode} />
        </div>
      </form>
    </Form>
  );
}
