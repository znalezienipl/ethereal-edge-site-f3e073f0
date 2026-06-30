import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { getAvailableSlots } from "@/lib/booking/availability";
import { formatLongDate } from "@/lib/format/date";

interface Props {
  date: Date;
  durationMin: number;
  selected?: string;
  onSelect: (time: string) => void;
}

export function TimeStep({ date, durationMin, selected, onSelect }: Props) {
  const slots = useMemo(() => getAvailableSlots(date, durationMin), [date, durationMin]);

  return (
    <div>
      <div className="text-sm text-muted-foreground capitalize mb-8">
        {formatLongDate(date)}
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {slots.map((t) => {
          const active = t === selected;
          return (
            <button
              type="button"
              key={t}
              onClick={() => onSelect(t)}
              className={cn(
                "py-4 text-sm tabular-nums border transition-[border-color,background-color,color] duration-300",
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border/60 text-foreground hover:border-foreground/60",
              )}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}
