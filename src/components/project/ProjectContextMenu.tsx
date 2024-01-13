"use client";

import React, { useState } from "react";
import { Pencil1Icon } from "@radix-ui/react-icons";
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
import { createBrowserClient } from "@/lib/pocketbase";
import { useRouter } from "next/navigation";
import { Collections } from "@/types/pocketbase-types";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/project-types";

export default function ProjectContextMenu({ project }: Project) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);

  async function deleteProject() {
    const pb = createBrowserClient();

    try {
      await pb.collection(Collections.Projects).delete(project.id);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setDialogOpen(false);
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Pencil1Icon className="rounded-full hover:ring-[5px] hover:ring-accent" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="absolute bottom-0 left-6">
          <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>You are about to delete project: {project.name}</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <Button variant="destructive" onClick={deleteProject}>
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
}
