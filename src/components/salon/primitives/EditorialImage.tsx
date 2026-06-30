import { cn } from "@/lib/utils";
import { useT } from "@/content/useT";

interface Props {
  src?: string;
  alt: string;
  aspect?: "3/4" | "4/5" | "1/1" | "4/3" | "16/9" | "16/10" | "21/9";
  className?: string;
  priority?: boolean;
  sizes?: string;
}

const aspectClass: Record<NonNullable<Props["aspect"]>, string> = {
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-[16/9]",
  "16/10": "aspect-[16/10]",
  "21/9": "aspect-[21/9]",
};

export function EditorialImage({
  src,
  alt,
  aspect = "3/4",
  className,
  priority,
  sizes,
}: Props) {
  const t = useT();
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-muted",
        aspectClass[aspect],
        className,
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          // @ts-expect-error fetchpriority is a valid HTML attribute
          fetchpriority={priority ? "high" : undefined}
          decoding="async"
          sizes={sizes}
          className="absolute inset-0 h-full w-full object-cover transition-[transform,filter] duration-[1200ms] ease-out hover:scale-[1.02] hover:brightness-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif italic text-sm text-muted-foreground/60">
            {t.imagePlaceholder}
          </span>
        </div>
      )}
    </div>
  );
}
