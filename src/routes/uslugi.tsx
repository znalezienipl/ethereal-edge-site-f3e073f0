import { createFileRoute } from "@tanstack/react-router";
import { useSalonConfig } from "@/config/useSalonConfig";
import { useT } from "@/content/useT";
import { SectionFrame } from "@/components/salon/primitives/SectionFrame";
import { Eyebrow } from "@/components/salon/primitives/Eyebrow";
import { SerifHeadline } from "@/components/salon/primitives/SerifHeadline";
import { LuxButton } from "@/components/salon/primitives/LuxButton";
import { Reveal } from "@/components/salon/primitives/Reveal";
import { formatPriceZl } from "@/lib/format/price";
import type { Service, ServiceCategory } from "@/config/salon.types";

export const Route = createFileRoute("/uslugi")({
  head: () => ({
    meta: [
      { title: "Rytuały · Lekkość" },
      {
        name: "description",
        content: "Pełna lista zabiegów: pielęgnacja twarzy, brwi i rzęsy, makijaż permanentny.",
      },
      { property: "og:title", content: "Rytuały · Lekkość" },
      {
        property: "og:description",
        content: "Pełna lista zabiegów Lekkość Beauty Center.",
      },
    ],
  }),
  component: Uslugi,
});

function Uslugi() {
  const config = useSalonConfig();
  const t = useT();

  const grouped = config.services.reduce<Record<ServiceCategory, Service[]>>(
    (acc, s) => {
      (acc[s.category] ||= []).push(s);
      return acc;
    },
    {} as Record<ServiceCategory, Service[]>,
  );

  return (
    <>
      <SectionFrame width="default" spacing="default" className="pt-40 md:pt-48">
        <Reveal>
          <Eyebrow>{t.nav.services}</Eyebrow>
          <SerifHeadline as="h1" size="xl" className="mt-10 max-w-[16ch]">
            {t.sections.rituals.headline}
          </SerifHeadline>
        </Reveal>
      </SectionFrame>

      <SectionFrame width="default" spacing="tight">
        <div className="space-y-24">
          {(Object.keys(grouped) as ServiceCategory[]).map((cat) => (
            <Reveal key={cat}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                <div className="md:col-span-4">
                  <div className="text-eyebrow">{t.services.categories[cat]}</div>
                </div>
                <div className="md:col-span-8">
                  <ul className="divide-y divide-border/60 border-y border-border/60">
                    {grouped[cat].map((s) => (
                      <li
                        key={s.id}
                        className="py-7 flex items-baseline justify-between gap-8"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-serif text-xl md:text-2xl text-foreground">
                            {s.name}
                          </div>
                          <div className="mt-2 text-sm text-muted-foreground max-w-[44ch]">
                            {s.shortDesc}
                          </div>
                          <div className="mt-2 text-xs tracking-[0.15em] uppercase text-muted-foreground">
                            {t.services.duration(s.durationMin)}
                          </div>
                        </div>
                        <div className="text-right tabular-nums shrink-0">
                          {s.originalPrice && s.price !== s.originalPrice && (
                            <div className="text-xs text-muted-foreground line-through">
                              {formatPriceZl(s.originalPrice)}
                            </div>
                          )}
                          <div className="text-base text-foreground">
                            {s.price === 0 ? t.services.free : formatPriceZl(s.price)}
                          </div>
                          {s.originalPrice && s.price !== s.originalPrice && (
                            <div className="mt-1 text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                              {t.services.firstVisit}
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-32 flex justify-center">
          <LuxButton to="/rezerwacja">{t.nav.book}</LuxButton>
        </div>
      </SectionFrame>
    </>
  );
}
