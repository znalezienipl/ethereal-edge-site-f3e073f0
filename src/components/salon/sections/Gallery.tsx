import { SectionFrame } from "../primitives/SectionFrame";
import { EditorialImage } from "../primitives/EditorialImage";
import { Eyebrow } from "../primitives/Eyebrow";
import { Reveal } from "../primitives/Reveal";
import { useT } from "@/content/useT";

interface Props {
  images: string[];
}

const PLACEHOLDER_COUNT = 6;

export function Gallery({ images }: Props) {
  const t = useT();
  const items: Array<string | undefined> =
    images.length > 0
      ? images
      : Array.from({ length: PLACEHOLDER_COUNT }, () => undefined);

  return (
    <SectionFrame width="wide" spacing="loose">
      <Reveal>
        <Eyebrow>{t.sections.gallery.eyebrow}</Eyebrow>
      </Reveal>
      <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        {items.map((src, i) => (
          <Reveal key={i} delay={(i % 3) * 0.06}>
            <EditorialImage src={src} alt="" aspect={i % 3 === 1 ? "3/4" : "4/5"} />
          </Reveal>
        ))}
      </div>
    </SectionFrame>
  );
}
