import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

interface Props {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses: Record<NonNullable<Props["size"]>, string> = {
  sm: "text-2xl md:text-3xl leading-[1.1]",
  md: "text-3xl md:text-5xl leading-[1.05]",
  lg: "text-4xl md:text-6xl lg:text-7xl leading-[1.02]",
  xl: "text-5xl md:text-7xl lg:text-8xl leading-[0.98]",
};

export function SerifHeadline({ as: Tag = "h2", children, className, size = "md" }: Props) {
  return (
    <Tag
      className={cn(
        "font-serif font-normal tracking-[-0.01em] text-foreground",
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
