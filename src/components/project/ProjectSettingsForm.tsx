"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";
import { ProjectsResponse } from "@/types/pocketbase-types";
import { TProjectForm, projectFormSchema } from "@/schemas/project-form";
import toastStatusResponse from "@/utils/toast-responses";
import { updateProject } from "@/actions/project";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ProjectSettingsFormProps {
  project: ProjectsResponse;
}

export default function ProjectSettingsForm({ project }: ProjectSettingsFormProps) {
  const projectSettingsForm = useForm<TProjectForm>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: project.name,
      key: project.key,
      description: project.description,
    },
  });

  async function onSubmit(values: TProjectForm) {
    toastStatusResponse(await updateProject(project, values));
  }

  return (
    <Form {...projectSettingsForm}>
      <form onSubmit={projectSettingsForm.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={projectSettingsForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="A name for this project" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={projectSettingsForm.control}
          name="key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Descriptive prefix to identify work from this project"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={projectSettingsForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="min-h-24 resize-none"
                  placeholder="Details and/or information about project..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={projectSettingsForm.formState.isSubmitting}
          className="rounded-sm"
          type="submit"
        >
          {projectSettingsForm.formState.isSubmitting ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              <p>Saving</p>
            </>
          ) : (
            <p>Save</p>
          )}
        </Button>
      </form>
    </Form>
  );
}
