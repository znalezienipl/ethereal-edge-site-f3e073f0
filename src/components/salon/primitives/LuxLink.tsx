import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface Props {
  to?: string;
  href?: string;
  external?: boolean;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
}

const base =
  "relative inline-block font-sans text-[13px] tracking-[0.04em] text-foreground transition-opacity duration-500 ease-out hover:opacity-70 focus-visible:outline-none focus-visible:opacity-70";

export function LuxLink({ to, href, external, children, className, activeClassName }: Props) {
  if (to) {
    return (
      <Link
        to={to}
        className={cn(base, className)}
        activeProps={activeClassName ? { className: activeClassName } : undefined}
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={cn(base, className)}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
