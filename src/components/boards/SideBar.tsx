import { TProjectsExpand } from "@/types/boards-interface";
import { ProjectsResponse } from "@/types/pocketbase-types";
import React from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GearIcon, LayoutIcon } from "@radix-ui/react-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SideBarProps {
  project: ProjectsResponse<TProjectsExpand>;
}

export default function SideBar({ project }: SideBarProps) {
  return (
    <aside className="flex h-full flex-col justify-between px-4 py-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold">{`${project.name}`}</h1>
        <p className="text-xs">Software Project</p>
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger>Planning</AccordionTrigger>
            <AccordionContent>
              <Link href="/projects">
                <Button variant="secondary" className="w-full justify-start p-2">
                  <LayoutIcon className="mr-1 h-5 w-5" />
                  Board
                </Button>
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex flex-col gap-2">
        <Separator />
        <Link href="/projects">
          <Button variant="ghost" className="w-full justify-start p-2">
            <GearIcon className="mr-1 h-5 w-5" />
            Project Settings
          </Button>
        </Link>
      </div>
    </aside>
  );
}
