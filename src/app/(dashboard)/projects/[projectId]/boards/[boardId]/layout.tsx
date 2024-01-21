import BoardsRefreshLink from "@/components/boards/BoardsRefreshLink";
import { createServerClient } from "@/lib/pocketbase";
import { Collections, ProjectsResponse } from "@/types/pocketbase-types";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

interface BoardsLayoutProps {
  children: React.ReactNode;
  params: {
    boardId: string;
  };
}

export default async function BoardsLayout({ children, params }: BoardsLayoutProps) {
  console.log("Boards Layout rendered");

  const pb = createServerClient(cookies());
  const data = await pb.collection(Collections.Boards).getOne<{
    expand?: {
      project: ProjectsResponse;
    };
  }>(params.boardId, {
    fields: "expand",
    expand: "project",
  });

  return (
    <div className="flex h-full flex-col gap-4 p-6">
      <div className="text-sm">
        <Link href="/projects" scroll={false}>
          <span className="hover:underline">Projects</span>
        </Link>
        {" / "}
        <BoardsRefreshLink projectName={data.expand?.project.name || "Software project"} />
      </div>
      {children}
    </div>
  );
}
