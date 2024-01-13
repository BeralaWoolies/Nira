import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import NavLinks from "@/components/navbar/NavLinks";
import ProfileContextMenu from "@/components/navbar/ProfileContextMenu";

export default function NavBar() {
  return (
    <nav className="flex w-screen items-center justify-between border-b px-5 py-3 shadow-sm">
      <div className="flex items-center gap-6">
        <NavLinks />
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <ProfileContextMenu />
      </div>
    </nav>
  );
}
