"use client";

import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProjectsResponse } from "@/types/pocketbase-types";
import { TProjectUploadForm, projectUploadFormSchema } from "@/schemas/project-upload-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { createBrowserClient } from "@/lib/pocketbase";
import toastStatusResponse from "@/utils/toast-responses";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "@radix-ui/react-icons";
import ProjectAvatar from "@/components/project/ProjectAvatar";

interface ProjectUploadFormProps {
  project: ProjectsResponse;
}

export default function ProjectUploadForm({ project }: ProjectUploadFormProps) {
  const router = useRouter();

  const formRef = useRef<HTMLFormElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const projectUploadForm = useForm<TProjectUploadForm>({
    resolver: zodResolver(projectUploadFormSchema),
  });

  async function onSubmit(values: TProjectUploadForm) {
    try {
      const pb = createBrowserClient();
      await pb.collection("projects").update(project.id, values);
      toastStatusResponse({
        success: "Successfully uploaded project icon",
      });
      router.refresh();
      projectUploadForm.reset();
    } catch (error) {
      toastStatusResponse({
        error: "Could not upload project icon",
      });
    }
  }

  return (
    <Form {...projectUploadForm}>
      <form
        onSubmit={projectUploadForm.handleSubmit(onSubmit)}
        className="flex w-full justify-center"
        ref={formRef}
      >
        <FormField
          control={projectUploadForm.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col items-center gap-2">
                  <ProjectAvatar project={project} className="h-[8rem] w-[8rem]" />
                  <Input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target?.files?.item(0)) {
                        field.onChange(e.target.files.item(0));
                        formRef.current?.requestSubmit();
                      } else {
                        projectUploadForm.reset();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    className="rounded-sm"
                    size="sm"
                    onClick={() => inputRef.current?.click()}
                  >
                    <ImageIcon className="mr-1 h-4 w-4 shrink-0" />
                    Change icon
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
