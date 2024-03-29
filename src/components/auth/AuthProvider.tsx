"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { createBrowserClient } from "@/lib/pocketbase";
import GoogleIcon from "@/components/icons/GoogleIcon";

type Provider = "google";

interface AuthProviderProps {
  onAuthSuccess: () => void;
}

export default function AuthProvider({ onAuthSuccess }: AuthProviderProps) {
  async function authWithProvider(provider: Provider) {
    try {
      const pb = createBrowserClient();
      const authData = await pb.collection("users").authWithOAuth2({
        provider: provider,
      });
      console.log(authData);
      onAuthSuccess();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        className="w-full"
        onClick={() => authWithProvider("google")}
      >
        <div className="mr-1">
          <GoogleIcon />
        </div>
        Continue with Google
      </Button>
    </>
  );
}
