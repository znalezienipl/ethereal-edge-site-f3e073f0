import type { BookingPayload, BookingResult } from "./types";

/**
 * Frontend-only stub. Replace this function body with a Cloud call
 * (createServerFn → DB insert) to enable persistence.
 */
export async function submitBooking(payload: BookingPayload): Promise<BookingResult> {
  await new Promise((r) => setTimeout(r, 700));
  const reference =
    "LK-" +
    payload.date.replace(/-/g, "").slice(2) +
    "-" +
    Math.random().toString(36).slice(2, 6).toUpperCase();
  if (typeof window !== "undefined") {
    // eslint-disable-next-line no-console
    console.info("[booking] submitted", { reference, payload });
  }
  return { ok: true, reference };
}
