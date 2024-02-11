import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createFileUrl } from "@/lib/pocketbase";
import { UsersResponse } from "@/types/pocketbase-types";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  user: UsersResponse;
  className?: string;
}

export default function UserAvatar({ user, className }: UserAvatarProps) {
  const avatarUrl = user.avatar
    ? createFileUrl({
        collectionId: user.collectionId,
        recordId: user.id,
        filename: user.avatar,
      })
    : undefined;

  return (
    <Avatar className={cn("hover:ring-[5px] hover:ring-accent", className)}>
      <AvatarImage src={avatarUrl} alt={`@${user.username}`} />
      <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
