import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useT } from "@/content/useT";
import { useSalonConfig } from "@/config/useSalonConfig";
import { LuxLink } from "../primitives/LuxLink";
import { LuxButton } from "../primitives/LuxButton";

export function Navigation() {
  const t = useT();
  const config = useSalonConfig();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: Array<{ to: string; label: string }> = [
    { to: "/", label: t.nav.home },
    { to: "/uslugi", label: t.nav.services },
    { to: "/kontakt", label: t.nav.contact },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,padding] duration-500",
        scrolled
          ? "bg-background/85 backdrop-blur-md py-4"
          : "bg-transparent py-6 md:py-8",
      )}
    >
      <div className="max-w-[1480px] mx-auto px-6 md:px-10 flex items-center justify-between">
        <Link
          to="/"
          className="font-serif text-xl md:text-2xl tracking-[-0.01em] text-foreground"
          onClick={() => setOpen(false)}
        >
          {config.brand.name}
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <LuxLink key={l.to} to={l.to} activeClassName="opacity-70">
              {l.label}
            </LuxLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <LuxButton to="/rezerwacja" variant="ghost">
            {t.nav.book}
          </LuxButton>
        </div>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
        >
          <span
            className={cn(
              "block h-px w-6 bg-foreground transition-transform duration-300",
              open && "translate-y-[6px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-px w-6 bg-foreground transition-opacity duration-300",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block h-px w-6 bg-foreground transition-transform duration-300",
              open && "-translate-y-[6px] -rotate-45",
            )}
          />
        </button>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden bg-background transition-[max-height,opacity] duration-500 ease-out",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="px-6 py-12 flex flex-col gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="font-serif text-3xl text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-6">
            <LuxButton to="/rezerwacja" onClick={() => setOpen(false)}>
              {t.nav.book}
            </LuxButton>
          </div>
        </div>
      </div>
    </header>
  );
}
