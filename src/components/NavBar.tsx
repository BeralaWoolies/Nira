import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/UserAvatar";
import { ThemeToggle } from "./ThemeToggle";

export default function NavBar() {
  return (
    <nav className="fixed flex w-screen items-center justify-between border-b px-5 py-3 shadow-sm">
      <div>
        <Link href="/projects">
          <Button variant="ghost">
            <h1 className="text-3xl font-bold">Nira</h1>
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <UserAvatar />
      </div>
    </nav>
  );
}
