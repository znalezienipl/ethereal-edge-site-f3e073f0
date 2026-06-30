import type { Specialist } from "@/config/salon.types";
import { cn } from "@/lib/utils";

interface Props {
  specialists: Specialist[];
  selectedId?: string;
  onSelect: (s: Specialist) => void;
}

export function SpecialistStep({ specialists, selectedId, onSelect }: Props) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {specialists.map((s) => {
        const active = s.id === selectedId;
        return (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => onSelect(s)}
              className={cn(
                "w-full text-left p-8 border transition-[border-color,opacity] duration-300",
                active
                  ? "border-foreground"
                  : "border-border/60 hover:border-foreground/60",
              )}
            >
              <div className="font-serif text-2xl text-foreground">{s.name}</div>
              <div className="mt-2 text-xs tracking-[0.15em] uppercase text-muted-foreground">
                {s.role}
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
