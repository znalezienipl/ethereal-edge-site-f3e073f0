import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SalonConfig } from "@/config/salon.types";
import { useT } from "@/content/useT";
import { useBookingMachine } from "./useBookingMachine";
import { StepIndicator } from "./StepIndicator";
import { ServiceStep } from "./steps/ServiceStep";
import { SpecialistStep } from "./steps/SpecialistStep";
import { DateStep } from "./steps/DateStep";
import { TimeStep } from "./steps/TimeStep";
import { DetailsStep } from "./steps/DetailsStep";
import { ConfirmationStep } from "./steps/ConfirmationStep";
import { submitBooking } from "@/lib/booking/submitBooking";
import { formatIsoDate } from "@/lib/format/date";
import type { DetailsValidatedValues } from "@/lib/booking/schema";

interface Props {
  services: SalonConfig["services"];
  specialists: SalonConfig["specialists"];
}

const slideVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export function BookingFlow({ services, specialists }: Props) {
  const t = useT();
  const m = useBookingMachine();
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const stepLabels = [
    t.booking.steps.service,
    t.booking.steps.specialist,
    t.booking.steps.date,
    t.booking.steps.time,
    t.booking.steps.details,
  ];

  const handleSubmit = async (details: DetailsValidatedValues) => {
    if (!m.draft.service || !m.draft.specialist || !m.draft.date || !m.draft.time) return;
    m.setDetails(details);
    setSubmitting(true);
    try {
      const result = await submitBooking({
        service: m.draft.service,
        specialist: m.draft.specialist,
        date: formatIsoDate(m.draft.date),
        time: m.draft.time,
        details,
      });
      setReference(result.reference);
    } finally {
      setSubmitting(false);
    }
  };

  if (reference) return <ConfirmationStep reference={reference} />;

  return (
    <div>
      <StepIndicator step={m.step} label={stepLabels[m.step]} />

      <div className="mt-12 min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={m.step}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {m.step === 0 && (
              <ServiceStep
                services={services}
                selectedId={m.draft.service?.id}
                onSelect={(s) => {
                  m.setService(s);
                  setTimeout(m.next, 200);
                }}
              />
            )}
            {m.step === 1 && (
              <SpecialistStep
                specialists={specialists}
                selectedId={m.draft.specialist?.id}
                onSelect={(s) => {
                  m.setSpecialist(s);
                  setTimeout(m.next, 200);
                }}
              />
            )}
            {m.step === 2 && (
              <DateStep selected={m.draft.date} onSelect={(d) => { m.setDate(d); setTimeout(m.next, 200); }} />
            )}
            {m.step === 3 && m.draft.date && m.draft.service && (
              <TimeStep
                date={m.draft.date}
                durationMin={m.draft.service.durationMin}
                selected={m.draft.time}
                onSelect={(t) => { m.setTime(t); setTimeout(m.next, 200); }}
              />
            )}
            {m.step === 4 && (
              <DetailsStep
                onSubmit={handleSubmit}
                submitLabel={t.booking.submit}
                submitting={submitting}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {m.step > 0 && m.step < 4 && (
        <div className="mt-16 flex items-center justify-between">
          <button
            type="button"
            onClick={m.back}
            className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            ← {t.booking.back}
          </button>
        </div>
      )}
      {m.step === 4 && (
        <div className="mt-10">
          <button
            type="button"
            onClick={m.back}
            className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            ← {t.booking.back}
          </button>
        </div>
      )}
    </div>
  );
}
