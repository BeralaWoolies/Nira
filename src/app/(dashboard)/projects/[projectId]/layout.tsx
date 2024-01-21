import WorkspaceView from "@/components/boards/WorkspaceView";
import SideBar from "@/components/boards/SideBar";
import { Collections, ProjectsResponse } from "@/types/pocketbase-types";
import { createServerClient } from "@/lib/pocketbase";
import { cookies } from "next/headers";

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  params: {
    projectId: string;
  };
}

export default async function WorkspaceLayout({ children, params }: WorkspaceLayoutProps) {
  console.log("WorkspaceLayout rendered");

  const pb = createServerClient(cookies());
  const project = await pb
    .collection(Collections.Projects)
    .getOne<ProjectsResponse>(params.projectId);

  return <WorkspaceView sideView={<SideBar project={project} />}>{children}</WorkspaceView>;
}
