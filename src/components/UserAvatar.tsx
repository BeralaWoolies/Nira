import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createFileUrl, createServerClient } from "@/lib/pocketbase";
import { cookies } from "next/headers";
import { AuthSystemFields, UsersResponse } from "@/types/pocketbase-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutMenuItem from "@/components/LogoutMenuItem";

export default async function UserAvatar() {
  const pb = createServerClient(cookies());
  const { id: userId } = pb.authStore.model as AuthSystemFields;

  const {
    collectionId,
    id: recordId,
    avatar,
    username,
  } = await pb.collection("users").getOne<UsersResponse>(userId);

  const avatarUrl = avatar
    ? createFileUrl({
        collectionId: collectionId,
        recordId: recordId,
        filename: avatar,
      })
    : undefined;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-7 w-7 hover:ring-[5px] hover:ring-accent">
          <AvatarImage src={avatarUrl} alt={`@${username}`} />
          <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px]" align="end">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutMenuItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
