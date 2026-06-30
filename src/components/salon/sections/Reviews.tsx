import type { SalonConfig } from "@/config/salon.types";
import { SectionFrame } from "../primitives/SectionFrame";
import { Eyebrow } from "../primitives/Eyebrow";
import { Reveal } from "../primitives/Reveal";
import { useT } from "@/content/useT";

interface Props {
  reviews: SalonConfig["reviews"];
}

export function Reviews({ reviews }: Props) {
  const t = useT();
  const [primary, ...secondary] = reviews.quotes;
  const meta = t.reviewsMeta(
    `${reviews.booksy.rating.toFixed(1)} / ${reviews.booksy.count}`,
    reviews.google
      ? `${reviews.google.rating.toFixed(1)} / ${reviews.google.count}`
      : undefined,
  );

  return (
    <SectionFrame width="default" spacing="loose">
      <Reveal>
        <Eyebrow>{t.sections.reviews.eyebrow}</Eyebrow>
      </Reveal>

      <Reveal delay={0.1}>
        <blockquote className="mt-16 md:mt-24 max-w-[22ch] mx-auto text-center">
          <div className="font-serif text-foreground text-4xl md:text-6xl leading-[1.1] tracking-[-0.01em]">
            <span aria-hidden className="font-serif text-muted-foreground/50">“</span>
            {primary.text}
            <span aria-hidden className="font-serif text-muted-foreground/50">”</span>
          </div>
          <footer className="mt-10 text-xs tracking-[0.2em] uppercase text-muted-foreground">
            {primary.author}
          </footer>
        </blockquote>
      </Reveal>

      {secondary.length > 0 && (
        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 max-w-[1080px] mx-auto">
          {secondary.map((q, i) => (
            <Reveal key={q.author} delay={i * 0.08}>
              <blockquote>
                <div className="font-serif text-2xl md:text-[28px] leading-[1.3] text-foreground/90">
                  {q.text}
                </div>
                <footer className="mt-6 text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  {q.author}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      )}

      <Reveal delay={0.2}>
        <div className="mt-32 text-center text-xs tracking-[0.2em] uppercase text-muted-foreground">
          {meta}
        </div>
      </Reveal>
    </SectionFrame>
  );
}
