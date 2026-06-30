import { useT } from "@/content/useT";
import { LuxButton } from "../../primitives/LuxButton";
import { SerifHeadline } from "../../primitives/SerifHeadline";
import { Eyebrow } from "../../primitives/Eyebrow";

interface Props {
  reference: string;
}

export function ConfirmationStep({ reference }: Props) {
  const t = useT();
  return (
    <div className="text-center max-w-[40ch] mx-auto py-16">
      <Eyebrow>{t.booking.confirmation.eyebrow}</Eyebrow>
      <SerifHeadline size="lg" className="mt-8">
        {t.booking.confirmation.headline}
      </SerifHeadline>
      <p className="mt-8 text-sm text-muted-foreground leading-relaxed">
        {t.booking.confirmation.body}
      </p>
      <div className="mt-6 text-xs tracking-[0.2em] uppercase text-muted-foreground">
        {reference}
      </div>
      <div className="mt-16">
        <LuxButton to="/">{t.booking.confirmation.back}</LuxButton>
      </div>
    </div>
  );
}
