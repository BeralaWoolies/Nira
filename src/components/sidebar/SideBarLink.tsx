"use client";

import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export type SideLink = {
  label: string;
  href: string;
  icon: React.JSX.Element;
};

interface SideBarLinkProps {
  link: SideLink;
}

export default function SideBarLink({ link }: SideBarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(link.href);

  return (
    <Link href={link.href} scroll={false}>
      <Button variant={isActive ? "secondary" : "ghost"} className="w-full justify-start p-2">
        {link.icon}
        {link.label}
      </Button>
    </Link>
  );
}
