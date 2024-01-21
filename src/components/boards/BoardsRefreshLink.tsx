"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface BoardsRefreshLinkProps {
  projectName: string;
}

export default function BoardsRefreshLink({ projectName }: BoardsRefreshLinkProps) {
  const router = useRouter();
  console.log("Boards Refresh link rendered");
  return (
    <Link href={""} onClick={() => router.refresh()} scroll={false}>
      <span className="hover:underline">{projectName}</span>
    </Link>
  );
}
