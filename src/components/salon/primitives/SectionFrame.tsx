import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

interface Props {
  as?: ElementType;
  id?: string;
  children: ReactNode;
  className?: string;
  /** outer vertical rhythm */
  spacing?: "default" | "tight" | "loose";
  /** horizontal container max width */
  width?: "default" | "wide" | "narrow" | "full";
}

const spacingClass: Record<NonNullable<Props["spacing"]>, string> = {
  tight: "py-20 md:py-28",
  default: "py-24 md:py-40",
  loose: "py-32 md:py-56",
};

const widthClass: Record<NonNullable<Props["width"]>, string> = {
  narrow: "max-w-[860px] mx-auto px-6 md:px-10",
  default: "max-w-[1280px] mx-auto px-6 md:px-10",
  wide: "max-w-[1480px] mx-auto px-6 md:px-10",
  full: "w-full",
};

export function SectionFrame({
  as: Tag = "section",
  id,
  children,
  className,
  spacing = "default",
  width = "default",
}: Props) {
  return (
    <Tag id={id} className={cn(spacingClass[spacing], className)}>
      <div className={widthClass[width]}>{children}</div>
    </Tag>
  );
}
