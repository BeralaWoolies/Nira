"use client";

import React, { useState } from "react";
import EditColumnTitleForm from "@/components/kanban-board/column/EditColumnTitleForm";
import { DotsHorizontalIcon, DragHandleDots2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { TColumn } from "@/types/boards-types";

interface ColumnTitleProps {
  column: TColumn;
}

export default function ColumnTitle({ column }: ColumnTitleProps) {
  const [editingMode, setEditingMode] = useState(false);

  if (!editingMode) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <DragHandleDots2Icon className="mr-1 h-4 w-4" />
          <div
            className="flex cursor-pointer items-center rounded-sm p-1 hover:bg-accent-foreground/10"
            onClick={() => setEditingMode(true)}
          >
            <h1 className="text-sm">{column.title}</h1>
          </div>
        </div>
        <Button
          className="h-6 w-6 justify-center rounded-sm p-1 opacity-0 hover:bg-accent-foreground/10 group-hover/[delete-form]:opacity-100"
          variant="ghost"
        >
          <DotsHorizontalIcon className="h-4 w-4 cursor-pointer" />
        </Button>
      </div>
    );
  }

  return <EditColumnTitleForm column={column} closeEditingMode={() => setEditingMode(false)} />;
}
