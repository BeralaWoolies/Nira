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
import { useRouter } from "next/navigation";
import AuthProvider from "@/components/AuthProvider";
import OrSeparator from "@/components/OrSeparator";
import { createBrowserClient } from "@/lib/pocketbase";
import { ClientResponseError } from "pocketbase";

const signUpFormSchema = z
  .object({
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8).max(72),
    passwordConfirm: z.string().min(8).max(72),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

type TSignUpForm = z.infer<typeof signUpFormSchema>;

export default function SignUpForm() {
  const router = useRouter();

  const signUpForm = useForm<TSignUpForm>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  function onAuthSuccess() {
    signUpForm.reset();
    router.push("/projects", { scroll: false });
    router.refresh();
  }

  async function onSubmit(values: TSignUpForm) {
    try {
      const pb = createBrowserClient();
      const userRecord = await pb.collection("users").create({
        username: values.username,
        email: values.email,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
      });
      console.log(userRecord);
      onAuthSuccess();
    } catch (error) {
      if (error instanceof ClientResponseError) {
        const errorData = error.response?.data;
        if (!errorData) {
          return;
        }

        const usernameErrorMsg = errorData.username?.message;
        const emailErrorMsg = errorData.email?.message;
        if (usernameErrorMsg) {
          signUpForm.setError("username", {
            message: usernameErrorMsg,
          });
        }
        if (emailErrorMsg) {
          signUpForm.setError("email", {
            message: emailErrorMsg,
          });
        }
      }
    }
  }

  return (
    <Form {...signUpForm}>
      <form onSubmit={signUpForm.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={signUpForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input autoFocus {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signUpForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signUpForm.control}
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
        <FormField
          control={signUpForm.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={signUpForm.formState.isSubmitting} className="w-full" type="submit">
          {signUpForm.formState.isSubmitting ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              <p>Signing Up</p>
            </>
          ) : (
            <p>Sign Up</p>
          )}
        </Button>
        <OrSeparator />
        <AuthProvider onAuthSuccess={onAuthSuccess} />
      </form>
    </Form>
  );
}
