import type { Service } from "@/config/salon.types";
import { SectionFrame } from "../primitives/SectionFrame";
import { Eyebrow } from "../primitives/Eyebrow";
import { SerifHeadline } from "../primitives/SerifHeadline";
import { EditorialImage } from "../primitives/EditorialImage";
import { LuxLink } from "../primitives/LuxLink";
import { Reveal } from "../primitives/Reveal";
import { useT } from "@/content/useT";
import { formatPriceZl } from "@/lib/format/price";

interface Props {
  services: Service[];
  servicesPath: string;
}

export function RitualsShowcase({ services, servicesPath }: Props) {
  const t = useT();
  const featured = services.slice(0, 6);

  return (
    <SectionFrame width="wide" spacing="loose">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20 md:mb-28">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>{t.sections.rituals.eyebrow}</Eyebrow>
            <SerifHeadline size="lg" className="mt-8">
              {t.sections.rituals.headline}
            </SerifHeadline>
          </Reveal>
        </div>
        <div className="lg:col-span-5 lg:col-start-8 lg:pt-10 flex lg:justify-end items-end">
          <LuxLink to={servicesPath}>{t.cta.viewServices} →</LuxLink>
        </div>
      </div>

      <div className="-mx-6 md:-mx-10 px-6 md:px-10 overflow-x-auto snap-x snap-mandatory scrollbar-none">
        <ul className="flex gap-8 md:gap-16">
          {featured.map((s, i) => (
            <li
              key={s.id}
              className="snap-start shrink-0 w-[78vw] sm:w-[52vw] md:w-[36vw] lg:w-[28vw]"
            >
              <Reveal delay={i * 0.05}>
                <EditorialImage src={s.imageUrl} alt={s.name} aspect="4/5" />
                <div className="mt-7 flex items-baseline justify-between gap-6">
                  <div className="font-serif text-2xl md:text-[28px] leading-tight text-foreground">
                    {s.name}
                  </div>
                  <div className="text-sm text-muted-foreground tabular-nums whitespace-nowrap">
                    {s.price === 0 ? t.services.free : formatPriceZl(s.price)}
                  </div>
                </div>
                <div className="mt-3 text-xs tracking-[0.15em] uppercase text-muted-foreground">
                  {t.services.duration(s.durationMin)} ·{" "}
                  {t.services.categories[s.category]}
                </div>
                <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-[36ch]">
                  {s.shortDesc}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </SectionFrame>
  );
}
