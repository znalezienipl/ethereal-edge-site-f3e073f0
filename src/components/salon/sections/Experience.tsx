import type { SalonConfig } from "@/config/salon.types";
import { SectionFrame } from "../primitives/SectionFrame";
import { Eyebrow } from "../primitives/Eyebrow";
import { SerifHeadline } from "../primitives/SerifHeadline";
import { Prose } from "../primitives/Prose";
import { Reveal } from "../primitives/Reveal";
import { useT } from "@/content/useT";

interface Props {
  experience: SalonConfig["experience"];
}

export function Experience({ experience }: Props) {
  const t = useT();
  const [feature, ...rest] = experience.pillars;

  return (
    <SectionFrame width="default" spacing="loose">
      <Reveal>
        <Eyebrow>{t.sections.experience.eyebrow}</Eyebrow>
        <SerifHeadline size="lg" className="mt-8 max-w-[18ch]">
          {t.sections.experience.headline}
        </SerifHeadline>
      </Reveal>

      <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-x-12 md:gap-y-24">
        <Reveal className="md:col-span-7">
          <div className="text-eyebrow">{feature.eyebrow}</div>
          <SerifHeadline size="md" className="mt-6">
            {feature.title}
          </SerifHeadline>
          <Prose className="mt-6">{feature.body}</Prose>
        </Reveal>

        <div className="md:col-span-5 md:col-start-8 md:pt-20 space-y-16">
          {rest.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="text-eyebrow">{p.eyebrow}</div>
              <div className="mt-4 font-serif text-2xl md:text-3xl text-foreground">
                {p.title}
              </div>
              <Prose className="mt-4 text-[14px]">{p.body}</Prose>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
