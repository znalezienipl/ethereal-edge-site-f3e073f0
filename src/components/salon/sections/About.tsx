import type { SalonConfig } from "@/config/salon.types";
import { SectionFrame } from "../primitives/SectionFrame";
import { EditorialImage } from "../primitives/EditorialImage";
import { Eyebrow } from "../primitives/Eyebrow";
import { SerifHeadline } from "../primitives/SerifHeadline";
import { Prose } from "../primitives/Prose";
import { Reveal } from "../primitives/Reveal";
import { useT } from "@/content/useT";

interface Props {
  about: SalonConfig["about"];
}

export function About({ about }: Props) {
  const t = useT();
  return (
    <SectionFrame id="o-salonie" width="wide" spacing="loose">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <Reveal className="lg:col-span-6">
          <EditorialImage
            src={about.portraitUrl}
            alt={about.specialistName}
            aspect="3/4"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </Reveal>

        <div className="lg:col-span-6 lg:pt-40">
          <Reveal>
            <Eyebrow>{t.sections.about.eyebrow}</Eyebrow>
            <SerifHeadline size="lg" className="mt-8">
              {about.specialistName}
            </SerifHeadline>
            <div className="mt-3 text-sm font-light tracking-wide text-muted-foreground">
              {about.role}
            </div>
            <Prose className="mt-10">{about.bio}</Prose>
            <div className="mt-14 font-serif italic text-base text-foreground/80">
              — {about.signatureLine}
            </div>
          </Reveal>
        </div>
      </div>
    </SectionFrame>
  );
}
