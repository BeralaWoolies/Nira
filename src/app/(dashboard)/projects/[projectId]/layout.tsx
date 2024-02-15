import WorkspaceView from "@/components/boards/WorkspaceView";
import SideBar from "@/components/sidebar/SideBar";
import { fetchProject } from "@/actions/project";

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  params: {
    projectId: string;
  };
}

export default async function WorkspaceLayout({ children, params }: WorkspaceLayoutProps) {
  console.log("WorkspaceLayout rendered");

  const project = await fetchProject(params.projectId);
  return <WorkspaceView sideView={<SideBar project={project} />}>{children}</WorkspaceView>;
}
