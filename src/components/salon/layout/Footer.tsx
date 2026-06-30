import { useT } from "@/content/useT";
import { useSalonConfig } from "@/config/useSalonConfig";
import { LuxLink } from "../primitives/LuxLink";

export function Footer() {
  const t = useT();
  const config = useSalonConfig();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 mt-20">
      <div className="max-w-[1480px] mx-auto px-6 md:px-10 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-10">
          <div className="md:col-span-5">
            <div className="font-serif text-3xl text-foreground">{config.brand.name}</div>
            <div className="mt-3 text-sm text-muted-foreground">{config.brand.tagline}</div>
          </div>

          <div className="md:col-span-3">
            <div className="text-eyebrow mb-5">{t.footer.columns.visit}</div>
            <ul className="space-y-3 text-sm text-foreground">
              <li><LuxLink to="/uslugi">{t.nav.services}</LuxLink></li>
              <li><LuxLink to="/rezerwacja">{t.nav.book}</LuxLink></li>
              <li><LuxLink to="/kontakt">{t.nav.contact}</LuxLink></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-eyebrow mb-5">{t.footer.columns.contact}</div>
            <ul className="space-y-3 text-sm text-foreground">
              {config.location.addressLines.map((line) => (
                <li key={line} className="text-muted-foreground">{line}</li>
              ))}
              <li className="text-muted-foreground">
                {config.location.postalCode} {config.location.city}
              </li>
              <li>
                <LuxLink href={`tel:${config.contact.phone.replace(/\s/g, "")}`}>
                  {config.contact.phone}
                </LuxLink>
              </li>
              <li>
                <LuxLink href={`mailto:${config.contact.email}`}>{config.contact.email}</LuxLink>
              </li>
              {config.contact.instagramUrl && (
                <li>
                  <LuxLink href={config.contact.instagramUrl} external>
                    {config.contact.instagram}
                  </LuxLink>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-border/60 flex flex-col md:flex-row justify-between gap-4 text-xs text-muted-foreground">
          <div>
            {t.footer.rightsPrefix} {year} {config.brand.name} · {config.location.city}
          </div>
          <div>{t.footer.rightsSuffix}</div>
        </div>
      </div>
    </footer>
  );
}
