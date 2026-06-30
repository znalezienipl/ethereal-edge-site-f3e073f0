import type { SalonConfig } from "@/config/salon.types";
import { SectionFrame } from "../primitives/SectionFrame";
import { Eyebrow } from "../primitives/Eyebrow";
import { SerifHeadline } from "../primitives/SerifHeadline";
import { LuxLink } from "../primitives/LuxLink";
import { Reveal } from "../primitives/Reveal";
import { useT } from "@/content/useT";

interface Props {
  location: SalonConfig["location"];
}

export function Location({ location }: Props) {
  const t = useT();
  return (
    <SectionFrame width="wide" spacing="loose">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <Reveal className="lg:col-span-7">
          <div className="aspect-[4/3] lg:aspect-[5/4] w-full overflow-hidden bg-muted">
            <iframe
              title={`${location.city} — mapa`}
              src={location.mapEmbedUrl}
              className="h-full w-full grayscale opacity-90"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-5 lg:pt-10">
          <Reveal>
            <Eyebrow>{t.sections.location.eyebrow}</Eyebrow>
            <SerifHeadline size="md" className="mt-8">
              {location.city}
            </SerifHeadline>

            <div className="mt-12 space-y-10">
              <div>
                <div className="text-eyebrow mb-3">{t.location.addressLabel}</div>
                <div className="text-base text-foreground">
                  {location.addressLines.map((l) => (
                    <div key={l}>{l}</div>
                  ))}
                  <div>
                    {location.postalCode} {location.city}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-eyebrow mb-3">{t.location.hoursLabel}</div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {location.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-6">
                      <span>{h.day}</span>
                      <span className="text-foreground">{h.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {location.parking && (
                <div>
                  <div className="text-eyebrow mb-3">{t.location.parkingLabel}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {location.parking}
                  </p>
                </div>
              )}

              <div>
                <LuxLink href={location.directionsUrl} external>
                  {t.cta.directions} →
                </LuxLink>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionFrame>
  );
}
