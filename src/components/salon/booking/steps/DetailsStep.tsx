import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { detailsSchema, type DetailsFormValues, type DetailsValidatedValues } from "@/lib/booking/schema";
import { useT } from "@/content/useT";
import { cn } from "@/lib/utils";

interface Props {
  defaultValues?: Partial<DetailsFormValues>;
  onSubmit: (values: DetailsValidatedValues) => void;
  submitLabel: string;
  submitting?: boolean;
}

export function DetailsStep({ defaultValues, onSubmit, submitLabel, submitting }: Props) {
  const t = useT();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DetailsFormValues>({
    resolver: zodResolver(detailsSchema),
    defaultValues,
    mode: "onBlur",
  });

  const fieldBase =
    "w-full bg-transparent border-b border-border/80 focus:border-foreground py-3 text-base text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors duration-300";

  return (
    <form
      onSubmit={handleSubmit((v) => onSubmit(v as DetailsValidatedValues))}
      className="space-y-10"
      noValidate
    >
      <Field label={t.booking.labels.name} error={errors.name?.message}>
        <input
          type="text"
          autoComplete="name"
          placeholder={t.booking.placeholders.name}
          className={fieldBase}
          {...register("name")}
        />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <Field label={t.booking.labels.phone} error={errors.phone?.message}>
          <input
            type="tel"
            autoComplete="tel"
            placeholder={t.booking.placeholders.phone}
            className={fieldBase}
            {...register("phone")}
          />
        </Field>
        <Field label={t.booking.labels.email} error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            placeholder={t.booking.placeholders.email}
            className={fieldBase}
            {...register("email")}
          />
        </Field>
      </div>
      <Field label={t.booking.labels.notes} error={errors.notes?.message}>
        <textarea
          rows={3}
          placeholder={t.booking.placeholders.notes}
          className={cn(fieldBase, "resize-none")}
          {...register("notes")}
        />
      </Field>

      <label className="flex items-start gap-4 text-sm text-muted-foreground cursor-pointer">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 accent-foreground"
          {...register("rodo")}
        />
        <span className="leading-relaxed">{t.booking.labels.rodo}</span>
      </label>
      {errors.rodo?.message && (
        <div className="text-xs text-destructive -mt-6">{errors.rodo.message}</div>
      )}

      <div className="pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center px-10 py-4 text-[11px] tracking-[0.22em] uppercase bg-foreground text-background hover:opacity-80 transition-opacity duration-500 disabled:opacity-60"
        >
          {submitting ? t.booking.submitting : submitLabel}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-eyebrow mb-3">{label}</div>
      {children}
      {error && <div className="mt-2 text-xs text-destructive">{error}</div>}
    </div>
  );
}
