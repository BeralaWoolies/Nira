import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createFileUrl } from "@/lib/pocketbase";
import { UsersResponse } from "@/types/pocketbase-types";

interface UserAvatarProps {
  user: UsersResponse;
}

export default function UserAvatar({ user }: UserAvatarProps) {
  const avatarUrl = user.avatar
    ? createFileUrl({
        collectionId: user.collectionId,
        recordId: user.id,
        filename: user.avatar,
      })
    : undefined;

  return (
    <Avatar className="h-7 w-7 hover:ring-[5px] hover:ring-accent">
      <AvatarImage src={avatarUrl} alt={`@${user.username}`} />
      <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
