import Breadcrumb from "@/components/Breadcrumb";
import { createServerClient } from "@/lib/pocketbase";
import { BoardsResponse, Collections, ProjectsResponse } from "@/types/pocketbase-types";
import { cookies } from "next/headers";

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
  const board = await pb.collection(Collections.Boards).getOne<
    BoardsResponse<{
      project: ProjectsResponse;
    }>
  >(params.boardId, {
    expand: "project",
  });

  return (
    <div className="flex h-full flex-col gap-4 p-6">
      <Breadcrumb
        crumbs={[
          { label: "Projects", href: "/projects" },
          {
            label: `${board.expand?.project.name}` || "Software Project",
            href: `/projects/${board.project}/boards/${board.id}`,
          },
        ]}
      />
      {children}
    </div>
  );
}
