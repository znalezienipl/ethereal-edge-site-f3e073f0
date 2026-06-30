import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "solid" | "ghost";

const base =
  "inline-flex items-center justify-center gap-3 px-7 py-4 text-[11px] font-sans font-normal tracking-[0.22em] uppercase cursor-pointer transition-[opacity,background-color,color] duration-500 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-none";

const variantClass: Record<Variant, string> = {
  solid: "bg-foreground text-background hover:opacity-80",
  ghost: "text-foreground hover:text-muted-foreground border-b border-foreground/40 px-0 py-2",
};

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

type AsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined };
type AsLink = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; href?: undefined };

export function LuxButton(props: AsButton | AsLink) {
  const { variant = "solid", className, children } = props;
  const classes = cn(base, variantClass[variant], className);

  if ("to" in props && props.to) {
    const { to, variant: _v, className: _c, children: _ch, ...rest } = props;
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  const { variant: _v, className: _c, children: _ch, to: _t, ...rest } = props as AsButton;
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
