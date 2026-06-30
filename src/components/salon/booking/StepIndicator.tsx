import { useT } from "@/content/useT";
import { TOTAL_STEPS } from "./useBookingMachine";

interface Props {
  step: number;
  label: string;
}

export function StepIndicator({ step, label }: Props) {
  const t = useT();
  return (
    <div className="flex items-baseline justify-between gap-6">
      <div className="text-eyebrow">{label}</div>
      <div className="text-eyebrow tabular-nums">
        {t.booking.stepOf(step + 1, TOTAL_STEPS)}
      </div>
    </div>
  );
}
