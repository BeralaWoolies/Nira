import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createFileUrl } from "@/lib/pocketbase";
import { ProjectsResponse } from "@/types/pocketbase-types";
import { cn } from "@/lib/utils";
import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";

interface ProjectAvatarProps {
  project: ProjectsResponse;
  className?: string;
}

export default function ProjectAvatar({ project, className }: ProjectAvatarProps) {
  const avatarUrl = project.avatar
    ? createFileUrl({
        collectionId: project.collectionId,
        recordId: project.id,
        filename: project.avatar,
      })
    : createAvatar(thumbs, {
        seed: project.id,
      }).toDataUriSync();

  return (
    <Avatar className={cn("h-7 w-7", className)}>
      <AvatarImage src={avatarUrl} alt={`@${project.name}`} />
      <AvatarFallback>{project.name.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
