import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Prose({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "font-sans font-light text-[15px] md:text-base leading-[1.7] text-muted-foreground max-w-[58ch]",
        className,
      )}
      {...props}
    />
  );
}
