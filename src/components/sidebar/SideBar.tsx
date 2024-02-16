import { ProjectsResponse } from "@/types/pocketbase-types";
import React from "react";
import { GearIcon, LayoutIcon } from "@radix-ui/react-icons";
import SideBarLink, { SideLink } from "@/components/sidebar/SideBarLink";
import { Separator } from "@/components/ui/separator";
import ProjectAvatar from "@/components/project/ProjectAvatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SideBarProps {
  project: ProjectsResponse;
}

export default function SideBar({ project }: SideBarProps) {
  const mainLinks: Array<SideLink> = [
    {
      label: "Board",
      href: `/projects/${project.id}/boards/${project.board}`,
      icon: <LayoutIcon className="mr-2 h-5 w-5" />,
    },
  ];

  const footerLinks: Array<SideLink> = [
    {
      label: "Project settings",
      href: `/projects/${project.id}/settings`,
      icon: <GearIcon className="mr-2 h-5 w-5" />,
    },
  ];

  return (
    <aside className="flex h-full flex-col justify-between px-4 py-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <ProjectAvatar project={project} />
          <div>
            <h1 className="text-sm font-semibold">{`${project.name}`}</h1>
            <p className="text-xs">Software Project</p>
          </div>
        </div>
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger>Planning</AccordionTrigger>
            <AccordionContent>
              {mainLinks.map((link, index) => (
                <SideBarLink key={index} link={link} />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex flex-col gap-2">
        <Separator />
        {footerLinks.map((link, index) => (
          <SideBarLink key={index} link={link} />
        ))}
      </div>
    </aside>
  );
}
