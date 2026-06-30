import { useCallback, useMemo, useState } from "react";
import type { Service, Specialist } from "@/config/salon.types";
import type { DetailsValidatedValues } from "@/lib/booking/schema";

export type BookingStep = 0 | 1 | 2 | 3 | 4;
export const TOTAL_STEPS = 5;

export interface BookingDraft {
  service?: Service;
  specialist?: Specialist;
  date?: Date;
  time?: string;
  details?: DetailsValidatedValues;
}

export function useBookingMachine() {
  const [step, setStep] = useState<BookingStep>(0);
  const [draft, setDraft] = useState<BookingDraft>({});

  const setService = useCallback(
    (service: Service) => setDraft((d) => ({ ...d, service, time: undefined })),
    [],
  );
  const setSpecialist = useCallback(
    (specialist: Specialist) => setDraft((d) => ({ ...d, specialist })),
    [],
  );
  const setDate = useCallback(
    (date: Date) => setDraft((d) => ({ ...d, date, time: undefined })),
    [],
  );
  const setTime = useCallback((time: string) => setDraft((d) => ({ ...d, time })), []);
  const setDetails = useCallback(
    (details: DetailsValidatedValues) => setDraft((d) => ({ ...d, details })),
    [],
  );

  const canAdvance = useMemo(() => {
    switch (step) {
      case 0:
        return Boolean(draft.service);
      case 1:
        return Boolean(draft.specialist);
      case 2:
        return Boolean(draft.date);
      case 3:
        return Boolean(draft.time);
      case 4:
        return Boolean(draft.details);
    }
  }, [step, draft]);

  const next = useCallback(() => {
    setStep((s) => (s < 4 ? ((s + 1) as BookingStep) : s));
  }, []);
  const back = useCallback(() => {
    setStep((s) => (s > 0 ? ((s - 1) as BookingStep) : s));
  }, []);

  return {
    step,
    draft,
    canAdvance,
    next,
    back,
    setService,
    setSpecialist,
    setDate,
    setTime,
    setDetails,
  };
}
