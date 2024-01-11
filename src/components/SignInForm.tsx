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
import { ClientResponseError } from "pocketbase";
import AuthProvider from "@/components/AuthProvider";
import OrSeparator from "@/components/OrSeparator";

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72),
});

type TSignInForm = z.infer<typeof signInFormSchema>;

export default function SignInForm() {
  const router = useRouter();

  const signInForm = useForm<TSignInForm>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onAuthSuccess() {
    signInForm.reset();
    router.push("/dashboard");
  }

  async function onSubmit(values: TSignInForm) {
    try {
      const pb = createBrowserClient();
      const authData = await pb.collection("users").authWithPassword(values.email, values.password);
      console.log(authData);
      onAuthSuccess();
    } catch (error) {
      console.error(error);
      if (error instanceof ClientResponseError) {
        signInForm.setError("email", {
          message: "Invalid email and/or password",
        });
      }
    }
  }

  return (
    <Form {...signInForm}>
      <form onSubmit={signInForm.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={signInForm.control}
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
          control={signInForm.control}
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
        <Button disabled={signInForm.formState.isSubmitting} className="w-full" type="submit">
          {signInForm.formState.isSubmitting ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              <p>Signing In</p>
            </>
          ) : (
            <p>Sign In</p>
          )}
        </Button>
        <OrSeparator />
        <AuthProvider onAuthSuccess={onAuthSuccess} />
      </form>
    </Form>
  );
}
