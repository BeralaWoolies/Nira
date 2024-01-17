"use client";

import React, { useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import SideBar from "@/components/boards/SideBar";
import { ProjectsResponse } from "@/types/pocketbase-types";
import { TProjectsExpand } from "@/types/boards-interface";

interface BoardsViewProps {
  project: ProjectsResponse<TProjectsExpand>;
}

export default function BoardsView({ project }: BoardsViewProps) {
  const [pinned, setPinned] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [dragging, setDragging] = useState(false);

  const ref = useRef<ImperativePanelHandle>(null);
  const sideBarRef = ref.current;

  function handleMouseOverLeave(mouseOver: boolean) {
    if (!sideBarRef || !pinned) {
      return;
    }

    if (mouseOver) {
      sideBarRef.resize(15);
    } else {
      sideBarRef.collapse();
    }
  }

  function handleOnDragging(isDragging: boolean) {
    if (pinned) {
      return;
    }

    if (isDragging) {
      setDragging(true);
    } else {
      setDragging(false);

      if (collapsed) {
        setPinned(true);
      }
    }
  }

  function handleButtonClick() {
    if (!sideBarRef) {
      return;
    }

    if (collapsed) {
      sideBarRef.expand();
      setPinned(false);
    } else {
      sideBarRef.collapse();
      setPinned(true);
    }
  }

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        order={1}
        ref={ref}
        defaultSize={15}
        collapsedSize={2}
        collapsible
        minSize={11}
        className={cn(
          (collapsed || pinned || !dragging) && "transition-all duration-300 ease-in-out"
        )}
        onCollapse={() => setCollapsed(true)}
        onExpand={() => setCollapsed(false)}
        onMouseOver={() => handleMouseOverLeave(true)}
        onMouseLeave={() => handleMouseOverLeave(false)}
      >
        <div className={cn("h-full", collapsed && "opacity-0")}>
          <SideBar project={project} />
        </div>
      </ResizablePanel>
      <ResizableHandle
        className={cn(
          "group border-l-2 bg-transparent pr-8 transition-all duration-300 hover:border-foreground has-[:hover]:hover:border-inherit",
          dragging && !pinned && "border-foreground",
          pinned && "hover:border-inherit"
        )}
        disabled={pinned}
        onDragging={handleOnDragging}
      >
        <Button
          size="icon"
          className={cn(
            "group absolute top-10 h-7 w-7 rounded-full opacity-0 transition-all duration-300 hover:scale-125 hover:bg-primary hover:opacity-100 group-hover:opacity-100",
            pinned && "opacity-100"
          )}
          onClick={handleButtonClick}
        >
          {pinned ? <ArrowRightIcon /> : <ArrowLeftIcon />}
        </Button>
      </ResizableHandle>
      <ResizablePanel order={2} defaultSize={85} minSize={50}>
        Two
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
