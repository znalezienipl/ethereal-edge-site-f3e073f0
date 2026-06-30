import type { Service, ServiceCategory } from "@/config/salon.types";
import { useT } from "@/content/useT";
import { cn } from "@/lib/utils";
import { formatPriceZl } from "@/lib/format/price";

interface Props {
  services: Service[];
  selectedId?: string;
  onSelect: (s: Service) => void;
}

export function ServiceStep({ services, selectedId, onSelect }: Props) {
  const t = useT();
  const grouped = services.reduce<Record<ServiceCategory, Service[]>>(
    (acc, s) => {
      (acc[s.category] ||= []).push(s);
      return acc;
    },
    {} as Record<ServiceCategory, Service[]>,
  );

  return (
    <div className="space-y-16">
      {(Object.keys(grouped) as ServiceCategory[]).map((cat) => (
        <div key={cat}>
          <div className="text-eyebrow mb-6">{t.services.categories[cat]}</div>
          <ul className="divide-y divide-border/60 border-y border-border/60">
            {grouped[cat].map((s) => {
              const active = s.id === selectedId;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(s)}
                    className={cn(
                      "group w-full text-left py-6 flex items-baseline justify-between gap-8 transition-opacity duration-300",
                      active ? "opacity-100" : "opacity-90 hover:opacity-100",
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <div
                        className={cn(
                          "font-serif text-xl md:text-2xl text-foreground",
                          active && "italic",
                        )}
                      >
                        {s.name}
                      </div>
                      <div className="mt-1 text-xs tracking-[0.15em] uppercase text-muted-foreground">
                        {t.services.duration(s.durationMin)}
                      </div>
                    </div>
                    <div className="text-right tabular-nums">
                      {s.originalPrice && s.price !== s.originalPrice && (
                        <div className="text-xs text-muted-foreground line-through">
                          {formatPriceZl(s.originalPrice)}
                        </div>
                      )}
                      <div className="text-base text-foreground">
                        {s.price === 0 ? t.services.free : formatPriceZl(s.price)}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
