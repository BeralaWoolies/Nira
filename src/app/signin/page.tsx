import CenterContainer from "@/components/CenterContainer";
import LogoHeader from "@/components/LogoHeader";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SignInForm from "@/components/auth/SignInForm";
import Link from "next/link";

export default function SignInPage() {
  return (
    <CenterContainer>
      <Link href="/" scroll={false}>
        <LogoHeader />
      </Link>
      <Card className="mt-7 w-[350px]">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          <p>
            {"Don't have an account? "}
            <span className="font-medium hover:underline">
              <Link href="/signup">Sign Up Now</Link>
            </span>
          </p>
        </CardFooter>
      </Card>
    </CenterContainer>
  );
}
