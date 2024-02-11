import React from "react";
import { createServerClient } from "@/lib/pocketbase";
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
import LogoutMenuItem from "@/components/navbar/LogoutMenuItem";
import UserAvatar from "@/components/UserAvatar";

export default async function ProfileContextMenu() {
  const pb = createServerClient(cookies());
  const { id: userId } = pb.authStore.model as AuthSystemFields;

  const user = await pb.collection("users").getOne<UsersResponse>(userId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} className="h-7 w-7" />
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
