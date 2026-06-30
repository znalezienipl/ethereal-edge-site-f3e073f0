import { addMinutes, format, isWeekend, set } from "date-fns";

/**
 * Mock availability: produces 30-minute slots between salon hours.
 * Deterministically skips a few slots per day to feel realistic.
 */
export function getAvailableSlots(date: Date, durationMin: number): string[] {
  const sat = date.getDay() === 6;
  const closed = date.getDay() === 0;
  if (closed) return [];

  const openHour = 10;
  const closeHour = sat ? 16 : 20;
  const start = set(date, { hours: openHour, minutes: 0, seconds: 0, milliseconds: 0 });
  const end = set(date, { hours: closeHour, minutes: 0, seconds: 0, milliseconds: 0 });

  const slots: string[] = [];
  let cursor = start;
  const step = 30;
  let i = 0;
  while (addMinutes(cursor, durationMin) <= end) {
    // deterministic pseudo-occupancy
    const seed = (date.getDate() * 7 + i * 3) % 5;
    if (seed !== 0 && seed !== 3) slots.push(format(cursor, "HH:mm"));
    cursor = addMinutes(cursor, step);
    i++;
  }
  // ensure non-empty
  if (slots.length === 0 && !isWeekend(date)) slots.push("11:00", "14:30", "17:00");
  return slots;
}
