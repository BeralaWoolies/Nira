import CreateProjectDialog from "@/components/project/CreateProjectDialog";
import ProjectCard from "@/components/project/ProjectCard";
import ProjectContainer from "@/components/project/ProjectContainer";
import { createServerClient } from "@/lib/pocketbase";
import { Collections, ProjectsResponse, UsersResponse } from "@/types/pocketbase-types";
import { cookies } from "next/headers";
import React from "react";

interface TExpand {
  members: UsersResponse[];
}

export default async function ProjectsPage() {
  async function getProjects() {
    const pb = createServerClient(cookies());

    try {
      const { items: projectRecords } = await pb
        .collection(Collections.Projects)
        .getList<ProjectsResponse<TExpand>>(1, 50, {
          expand: "members",
        });
      return projectRecords;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  const projects = await getProjects();

  return (
    <ProjectContainer>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <CreateProjectDialog />
      </div>
      <div className="mt-5 flex flex-wrap gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </ProjectContainer>
  );
}
