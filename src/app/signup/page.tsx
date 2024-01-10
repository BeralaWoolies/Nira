import CenterContainer from "@/components/CenterContainer";
import LogoHeader from "@/components/LogoHeader";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import SignUpForm from "@/components/SignUpForm";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <CenterContainer>
      <Link href="/">
        <LogoHeader />
      </Link>
      <Card className="mt-7 w-[350px]">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          <p>
            {"Already have an account? "}
            <span className="font-medium hover:underline">
              <Link href="/signin">Sign In Now</Link>
            </span>
          </p>
        </CardFooter>
      </Card>
    </CenterContainer>
  );
}
