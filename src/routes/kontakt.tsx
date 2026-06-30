import { createFileRoute } from "@tanstack/react-router";
import { useSalonConfig } from "@/config/useSalonConfig";
import { useT } from "@/content/useT";
import { SectionFrame } from "@/components/salon/primitives/SectionFrame";
import { Eyebrow } from "@/components/salon/primitives/Eyebrow";
import { SerifHeadline } from "@/components/salon/primitives/SerifHeadline";
import { LuxLink } from "@/components/salon/primitives/LuxLink";
import { Location } from "@/components/salon/sections/Location";
import { Reveal } from "@/components/salon/primitives/Reveal";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt · Lekkość" },
      { name: "description", content: "Skontaktuj się z Lekkość Beauty Center w Krakowie." },
      { property: "og:title", content: "Kontakt · Lekkość" },
      { property: "og:description", content: "Skontaktuj się z Lekkość Beauty Center w Krakowie." },
    ],
  }),
  component: Kontakt,
});

function Kontakt() {
  const config = useSalonConfig();
  const t = useT();
  return (
    <>
      <SectionFrame width="default" spacing="default" className="pt-40 md:pt-48">
        <Reveal>
          <Eyebrow>{t.nav.contact}</Eyebrow>
          <SerifHeadline as="h1" size="xl" className="mt-10 max-w-[18ch]">
            {t.contact.headline}
          </SerifHeadline>
        </Reveal>

        <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-16">
          <Reveal>
            <div className="text-eyebrow mb-4">{t.contact.phoneLabel}</div>
            <LuxLink
              href={`tel:${config.contact.phone.replace(/\s/g, "")}`}
              className="font-serif text-2xl"
            >
              {config.contact.phone}
            </LuxLink>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="text-eyebrow mb-4">{t.contact.emailLabel}</div>
            <LuxLink href={`mailto:${config.contact.email}`} className="font-serif text-2xl">
              {config.contact.email}
            </LuxLink>
          </Reveal>
          {config.contact.instagramUrl && (
            <Reveal delay={0.1}>
              <div className="text-eyebrow mb-4">{t.contact.instagramLabel}</div>
              <LuxLink
                href={config.contact.instagramUrl}
                external
                className="font-serif text-2xl"
              >
                {config.contact.instagram}
              </LuxLink>
            </Reveal>
          )}
        </div>
      </SectionFrame>

      <Location location={config.location} />
    </>
  );
}
