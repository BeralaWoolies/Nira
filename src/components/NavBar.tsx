import React from "react";
import UserAvatar from "@/components/UserAvatar";
import { ThemeToggle } from "./ThemeToggle";
import NavLinks from "@/components/NavLinks";

export default function NavBar() {
  return (
    <nav className="fixed flex w-screen items-center justify-between border-b px-5 py-3 shadow-sm">
      <div className="flex items-center gap-6">
        <NavLinks />
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <UserAvatar />
      </div>
    </nav>
  );
}
