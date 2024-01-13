"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { createBrowserClient } from "@/lib/pocketbase";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { AuthSystemFields } from "@/types/pocketbase-types";

const projectFormSchema = z
  .object({
    name: z.string().min(1).max(72),
    key: z.string().min(1).max(10),
    description: z.string().max(250),
  })
  .refine((data) => data.key.match(/^[0-9A-Z]+$/), {
    message: "Project keys can only contain uppercase alphanumeric characters",
    path: ["key"],
  });

type TProjectForm = z.infer<typeof projectFormSchema>;

interface ProjectFormProps {
  closeDialog: () => void;
}

export default function ProjectForm({ closeDialog }: ProjectFormProps) {
  const router = useRouter();

  const projectForm = useForm<TProjectForm>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
      key: "",
      description: "",
    },
  });

  async function onSubmit(values: TProjectForm) {
    try {
      const pb = createBrowserClient();
      const { id: userId } = pb.authStore.model as AuthSystemFields;

      await pb.collection("projects").create({
        name: values.name,
        key: values.key,
        description: values.description,
        members: [userId],
      });

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  }

  function onSuccess() {
    closeDialog();
    router.refresh();
  }

  return (
    <Form {...projectForm}>
      <form onSubmit={projectForm.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={projectForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input autoFocus {...field} type="text" placeholder="A name for this project" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={projectForm.control}
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
          control={projectForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="min-h-24"
                  placeholder="Details and/or information about project..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={projectForm.formState.isSubmitting} className="w-full" type="submit">
          {projectForm.formState.isSubmitting ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              <p>Creating project</p>
            </>
          ) : (
            <p>Create</p>
          )}
        </Button>
      </form>
    </Form>
  );
}
