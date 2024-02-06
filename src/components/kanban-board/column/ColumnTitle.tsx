"use client";

import React, { useState } from "react";
import EditColumnTitleForm from "@/components/kanban-board/column/EditColumnTitleForm";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { Column } from "@/types/column-types";
import ColumnContextMenu from "./ColumnContextMenu";

interface ColumnTitleProps {
  column: Column;
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
        <ColumnContextMenu column={column} />
      </div>
    );
  }

  return <EditColumnTitleForm column={column} closeEditingMode={() => setEditingMode(false)} />;
}
