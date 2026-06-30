import { createFileRoute } from "@tanstack/react-router";
import { useSalonConfig } from "@/config/useSalonConfig";
import { Hero } from "@/components/salon/sections/Hero";
import { About } from "@/components/salon/sections/About";
import { RitualsShowcase } from "@/components/salon/sections/RitualsShowcase";
import { Gallery } from "@/components/salon/sections/Gallery";
import { Experience } from "@/components/salon/sections/Experience";
import { Reviews } from "@/components/salon/sections/Reviews";
import { Location } from "@/components/salon/sections/Location";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lekkość · Beauty Center Kraków" },
      {
        name: "description",
        content:
          "Kameralny gabinet kosmetologii w Krakowie. Pielęgnacja twarzy, stylizacja brwi i rzęs, makijaż permanentny.",
      },
      { property: "og:title", content: "Lekkość · Beauty Center Kraków" },
      {
        property: "og:description",
        content: "Kameralny gabinet kosmetologii. Cisza, precyzja, rytuał.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pl_PL" },
    ],
  }),
  component: Home,
});

function Home() {
  const config = useSalonConfig();
  return (
    <>
      <Hero hero={config.hero} bookingPath="/rezerwacja" />
      <About about={config.about} />
      <RitualsShowcase services={config.services} servicesPath="/uslugi" />
      <Gallery images={config.gallery} />
      <Experience experience={config.experience} />
      <Reviews reviews={config.reviews} />
      <Location location={config.location} />
    </>
  );
}
