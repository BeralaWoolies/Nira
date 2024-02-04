import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import React from "react";

interface IssueIconProps {
  children: React.JSX.Element;
  content: string;
  className?: string;
}

export default function IssueIconTooltip({ children, content, className }: IssueIconProps) {
  const icon = React.Children.only(children);

  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-sm hover:bg-accent-foreground/10",
            className
          )}
        >
          {icon}
        </div>
      </TooltipTrigger>
      <TooltipContent className="rounded-sm">{content}</TooltipContent>
    </Tooltip>
  );
}
