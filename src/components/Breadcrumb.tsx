import React from "react";
import Link from "next/link";

interface BreadcrumbProps {
  crumbs: Array<{
    label: string;
    href: string;
  }>;
}

export default function Breadcrumb({ crumbs }: BreadcrumbProps) {
  return (
    <>
      {crumbs.map((crumb, index) => (
        <>
          <Link href={crumb.href} scroll={false}>
            <span className="hover:underline">{crumb.label}</span>
          </Link>
          {index < crumbs.length - 1 && <span>{" / "}</span>}
        </>
      ))}
    </>
  );
}
