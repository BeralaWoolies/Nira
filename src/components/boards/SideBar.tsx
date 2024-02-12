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
import Image from "next/image";
import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";

interface SideBarProps {
  project: ProjectsResponse;
}

export default function SideBar({ project }: SideBarProps) {
  console.log("SideBar rendered");

  const projectAvatar = createAvatar(thumbs, {
    seed: project.id,
    radius: 50,
    size: 25,
  }).toDataUriSync();

  return (
    <aside className="flex h-full flex-col justify-between px-4 py-6">
      <div className="flex flex-col gap-1">
        <div className="flex gap-2">
          <Image
            width={0}
            height={0}
            className="w-auto"
            src={projectAvatar}
            alt={`@project-${project.id} avatar`}
          />
          <div>
            <h1 className="text-sm font-semibold">{`${project.name}`}</h1>
            <p className="text-xs">Software Project</p>
          </div>
        </div>
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger>Planning</AccordionTrigger>
            <AccordionContent>
              <Link href="/projects" scroll={false}>
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
        <Link href="/projects" scroll={false}>
          <Button variant="ghost" className="w-full justify-start p-2">
            <GearIcon className="mr-1 h-5 w-5" />
            Project Settings
          </Button>
        </Link>
      </div>
    </aside>
  );
}
