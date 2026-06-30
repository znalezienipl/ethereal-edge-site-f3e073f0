import type { Service, Specialist } from "@/config/salon.types";
import type { DetailsValidatedValues } from "./schema";

export interface BookingPayload {
  service: Service;
  specialist: Specialist;
  date: string; // ISO yyyy-MM-dd
  time: string; // HH:mm
  details: DetailsValidatedValues;
}

export interface BookingResult {
  ok: true;
  reference: string;
}
