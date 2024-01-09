import CenterContainer from "@/components/CenterContainer";
import LogoHeader from "@/components/LogoHeader";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <CenterContainer>
      <Link href="/">
        <LogoHeader />
      </Link>
      <Card className="w-[350px] mt-7">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          <p>
            {"Don't have an account? "}
            <span className="font-medium hover:underline">
              <Link href="/register">Sign Up Now</Link>
            </span>
          </p>
        </CardFooter>
      </Card>
    </CenterContainer>
  );
}
