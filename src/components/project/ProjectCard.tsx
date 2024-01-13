import React from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import UserAvatar from "@/components/UserAvatar";
import ProjectContextMenu from "@/components/project/ProjectContextMenu";
import { Project } from "@/types/project-types";

export default function ProjectCard({ project }: Project) {
  let members = project.expand?.members;
  const numMembers = members ? members.length : 0;

  return (
    <Card className="shadows relative h-[150px] w-[350px] overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle>{project.name}</CardTitle>
            <ProjectContextMenu project={project} />
          </div>
          <CardDescription>{project.key}</CardDescription>
        </div>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardFooter className="absolute bottom-3 p-0 pl-6">
        <div className="flex items-center gap-1">
          <CardDescription>Members:</CardDescription>
          {members?.slice(0, 5).map((member) => <UserAvatar key={member.id} user={member} />)}
          {numMembers > 5 && <CardDescription>...</CardDescription>}
        </div>
      </CardFooter>
    </Card>
  );
}
