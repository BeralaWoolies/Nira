"use server";

import { createServerClient } from "@/lib/pocketbase";
import { TProjectForm } from "@/schemas/project-form";
import { Collections, ProjectsResponse } from "@/types/pocketbase-types";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";

export async function fetchProject(projectId: string) {
  try {
    const pb = createServerClient(cookies());
    const project = await pb.collection(Collections.Projects).getOne(projectId);

    return project;
  } catch (error) {
    throw error;
  }
}

export async function updateProject(project: ProjectsResponse, values: TProjectForm) {
  try {
    const pb = createServerClient(cookies());
    const updatedProject = await pb.collection(Collections.Projects).update(project.id, values);

    return {
      success: `Successfully updated project "${updatedProject.name}"`,
    };
  } catch (error) {
    return {
      error: `Could not update project "${project.name}"`,
    };
  } finally {
    revalidatePath(headers().get("referer") || "");
  }
}
