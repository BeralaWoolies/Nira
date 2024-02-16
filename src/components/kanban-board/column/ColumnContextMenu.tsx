"use client";

import { Button } from "@/components/ui/button";
import { Column } from "@/types/column-types";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import toastStatusResponse from "@/utils/toast-responses";
import { deleteColumn } from "@/actions/kanban-board";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ColumnContextMenuProps {
  column: Column;
}

export default function ColumnContextMenu({ column }: ColumnContextMenuProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="relative h-6 w-6 justify-center rounded-sm p-1 opacity-0 hover:bg-accent-foreground/10 group-hover/[delete-form]:opacity-100"
            variant="ghost"
          >
            <DotsHorizontalIcon className="h-4 w-4 cursor-pointer" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="absolute right-[-2rem] whitespace-nowrap">
          <DropdownMenuItem className="cursor-pointer">Set column limit</DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>You are about to delete column: {column.title}</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <Button
          variant="destructive"
          onClick={async () => {
            setDialogOpen(false);
            toastStatusResponse(await deleteColumn(column));
          }}
        >
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
}
