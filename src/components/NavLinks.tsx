"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    label: "Projects",
    href: "/projects",
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      <Link href="/projects" scroll={false}>
        <Button variant="ghost">
          <h1 className="text-2xl font-bold">Nira</h1>
        </Button>
      </Link>
      {navLinks.map((navLink, index) => {
        const isActive = pathname.startsWith(navLink.href);
        return (
          <Link key={index} href={navLink.href} scroll={false}>
            <Button variant={isActive ? "secondary" : "ghost"}>
              <h2 className={cn("text-base", isActive && "font-semibold")}>{navLink.label}</h2>
            </Button>
          </Link>
        );
      })}
    </>
  );
}
