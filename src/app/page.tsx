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
        <span className="text-blue-600 font-bold underline">
          <a href="https://www.atlassian.com/software/jira">Jira</a>
        </span>
      </p>
      <div className="flex p-3 gap-7">
        <Link href="/login">
          <Button>Get Started</Button>
        </Link>
      </div>
      <footer className="flex absolute bottom-3">
        <a href="https://github.com/BeralaWoolies/Nira">
          <Button variant="ghost" size="icon" className="mr-1">
            <GitHubLogoIcon className="h-7 w-7"></GitHubLogoIcon>
          </Button>
        </a>
        <p className="pt-1.5">© {new Date().getFullYear()} Clarke Tran</p>
      </footer>
    </CenterContainer>
  );
}
