import { format } from "date-fns";
import { pl } from "date-fns/locale";

export function formatLongDate(date: Date): string {
  return format(date, "EEEE, d MMMM yyyy", { locale: pl });
}

export function formatIsoDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}
