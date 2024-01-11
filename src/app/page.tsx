import LogoHeader from "@/components/LogoHeader";
import CenterContainer from "@/components/CenterContainer";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function LandingPage() {
  return (
    <CenterContainer>
      <LogoHeader />
      <p className="p-3">
        A project management software tool heavily inspired by{" "}
        <span className="font-bold text-blue-600 underline">
          <Link href="https://www.atlassian.com/software/jira">Jira</Link>
        </span>
      </p>
      <div className="flex gap-7 p-3">
        <Link href="/signin">
          <Button className="transition hover:scale-105">Get Started</Button>
        </Link>
      </div>
      <footer className="absolute bottom-3 flex">
        <Link href="https://github.com/BeralaWoolies/Nira">
          <Button variant="ghost" size="icon" className="mr-1">
            <GitHubLogoIcon className="h-7 w-7" />
          </Button>
        </Link>
        <p className="pt-1.5">
          © {new Date().getFullYear()}{" "}
          <span className="underline">
            <Link href="https://github.com/BeralaWoolies">BeralaWoolies</Link>
          </span>
          . All rights reserved.
        </p>
      </footer>
    </CenterContainer>
  );
}
