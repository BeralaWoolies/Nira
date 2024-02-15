import { fetchProject } from "@/actions/project";
import Breadcrumb from "@/components/Breadcrumb";
import ProjectSettingsForm from "@/components/project/ProjectSettingsForm";
import ProjectUploadForm from "@/components/project/ProjectUploadForm";
import React from "react";

interface SettingsPageProps {
  params: {
    projectId: string;
  };
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const project = await fetchProject(params.projectId);
  return (
    <div className="flex h-full flex-col gap-4 p-6">
      <Breadcrumb
        crumbs={[
          { label: "Projects", href: "/projects" },
          {
            label: `${project.name}` || "Software Project",
            href: `/projects/${project.id}/boards/${project.board}`,
          },
          { label: "Project settings", href: `/projects/${project.id}/settings` },
        ]}
      />
      <h1 className="text-2xl font-semibold">Settings</h1>
      <div className="flex h-full justify-center">
        <div className="w-[25rem] space-y-4">
          <ProjectUploadForm project={project} />
          <ProjectSettingsForm project={project} />
        </div>
      </div>
    </div>
  );
}
