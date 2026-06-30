import { Calendar } from "@/components/ui/calendar";
import { pl } from "date-fns/locale";

interface Props {
  selected?: Date;
  onSelect: (date: Date) => void;
}

export function DateStep({ selected, onSelect }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="flex justify-center">
      <Calendar
        mode="single"
        weekStartsOn={1}
        locale={pl}
        selected={selected}
        onSelect={(d) => d && onSelect(d)}
        disabled={(d) => d < today || d.getDay() === 0}
        className="border border-border/60 p-6"
      />
    </div>
  );
}
