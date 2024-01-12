"use client";

import React from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { createBrowserClient } from "@/lib/pocketbase";
import { useRouter } from "next/navigation";

function LogoutMenuItem() {
  const router = useRouter();
  const pb = createBrowserClient();

  function handleLogout() {
    pb.authStore.clear();
    router.replace("/signin", { scroll: false });
  }

  return (
    <DropdownMenuItem className="h-8 cursor-pointer" onClick={handleLogout}>
      Log out
    </DropdownMenuItem>
  );
}

export default LogoutMenuItem;
