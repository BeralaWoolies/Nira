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
import pb from "@/lib/pocketbase";
import { useRouter } from "next/navigation";
import { ClientResponseError } from "pocketbase";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72),
});

type TLoginForm = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const router = useRouter();

  const loginForm = useForm<TLoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: TLoginForm) {
    try {
      const authData = await pb.collection("users").authWithPassword(values.email, values.password);
      console.log(authData);
      loginForm.clearErrors();
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      if (error instanceof ClientResponseError) {
        loginForm.setError("email", {
          message: "Invalid email and/or password",
        });
      }
    }
  }

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input autoFocus {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loginForm.formState.isSubmitting} className="w-full" type="submit">
          {loginForm.formState.isSubmitting ? (
            <>
              <ReloadIcon className="animate-spin mr-2 h-4 w-4" />
              <p>Logging In</p>
            </>
          ) : (
            <p>Log In</p>
          )}
        </Button>
      </form>
    </Form>
  );
}
