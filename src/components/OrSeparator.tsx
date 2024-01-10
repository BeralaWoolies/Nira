import React from "react";
import { Separator } from "@/components/ui/separator";

export default function OrSeparator() {
  return (
    <div className="flex items-center justify-between">
      <Separator className="w-[45%]"></Separator>
      <p className="text-center">or</p>
      <Separator className="w-[45%]"></Separator>
    </div>
  );
}
