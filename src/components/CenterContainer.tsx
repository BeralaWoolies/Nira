import React from "react";

export default function CenterContainer({ children }: { children: React.ReactNode }) {
  return <main className="flex min-h-screen flex-col items-center p-24">{children}</main>;
}
