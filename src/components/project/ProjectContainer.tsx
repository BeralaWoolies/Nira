import React from "react";

export default function ProjectContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full p-7">
      <div className="h-full rounded-xl bg-secondary p-6 shadow-lg">{children}</div>
    </div>
  );
}
