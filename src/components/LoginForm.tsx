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
import { Separator } from "@/components/ui/separator";
import GoogleIcon from "./icons/GoogleIcon";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72),
});

type TLoginForm = z.infer<typeof loginFormSchema>;
type Provider = "google";

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

  async function authWithProvider(provider: Provider, router: AppRouterInstance) {
    try {
      const authData = await pb.collection("users").authWithOAuth2({
        provider: provider,
      });
      console.log(authData);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
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
                <Input autoFocus {...field} type="text" />
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
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loginForm.formState.isSubmitting} className="w-full" type="submit">
          {loginForm.formState.isSubmitting ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              <p>Logging In</p>
            </>
          ) : (
            <p>Log In</p>
          )}
        </Button>
        <div className="flex items-center justify-between">
          <Separator className="w-[45%]"></Separator>
          <p className="text-center">or</p>
          <Separator className="w-[45%]"></Separator>
        </div>
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          onClick={() => authWithProvider("google", router)}
        >
          <div className="mr-1">
            <GoogleIcon />
          </div>
          Continue with Google
        </Button>
      </form>
    </Form>
  );
}
