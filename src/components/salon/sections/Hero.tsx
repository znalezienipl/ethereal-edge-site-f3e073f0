import type { SalonConfig } from "@/config/salon.types";
import { EditorialImage } from "../primitives/EditorialImage";
import { Eyebrow } from "../primitives/Eyebrow";
import { SerifHeadline } from "../primitives/SerifHeadline";
import { LuxButton } from "../primitives/LuxButton";
import { Reveal } from "../primitives/Reveal";

interface Props {
  hero: SalonConfig["hero"];
  bookingPath: string;
}

export function Hero({ hero, bookingPath }: Props) {
  return (
    <section className="relative pt-40 md:pt-48 pb-24 md:pb-32">
      <div className="max-w-[1480px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end">
          <Reveal className="lg:col-span-5 lg:pb-24">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <SerifHeadline as="h1" size="xl" className="mt-10">
              {hero.headline}
            </SerifHeadline>
            <div className="mt-14">
              <LuxButton to={bookingPath}>{hero.cta}</LuxButton>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-7">
            <EditorialImage
              src={hero.imageUrl}
              alt={hero.headline}
              aspect="4/5"
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
