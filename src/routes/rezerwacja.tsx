import { createFileRoute } from "@tanstack/react-router";
import { useSalonConfig } from "@/config/useSalonConfig";
import { useT } from "@/content/useT";
import { SectionFrame } from "@/components/salon/primitives/SectionFrame";
import { Eyebrow } from "@/components/salon/primitives/Eyebrow";
import { SerifHeadline } from "@/components/salon/primitives/SerifHeadline";
import { BookingFlow } from "@/components/salon/booking/BookingFlow";

export const Route = createFileRoute("/rezerwacja")({
  head: () => ({
    meta: [
      { title: "Rezerwacja · Lekkość" },
      { name: "description", content: "Umów wizytę w Lekkość Beauty Center." },
      { property: "og:title", content: "Rezerwacja · Lekkość" },
      { property: "og:description", content: "Umów wizytę w Lekkość Beauty Center." },
    ],
  }),
  component: Rezerwacja,
});

function Rezerwacja() {
  const config = useSalonConfig();
  const t = useT();
  return (
    <SectionFrame width="narrow" spacing="default" className="pt-40 md:pt-48">
      <Eyebrow>{t.booking.title}</Eyebrow>
      <SerifHeadline as="h1" size="lg" className="mt-8">
        {t.nav.book}
      </SerifHeadline>
      <div className="mt-20">
        <BookingFlow services={config.services} specialists={config.specialists} />
      </div>
    </SectionFrame>
  );
}
