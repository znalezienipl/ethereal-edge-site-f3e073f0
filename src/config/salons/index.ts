import type { SalonConfig } from "../salon.types";
import { lekkoscConfig } from "./lekkosc";

export const salonRegistry: Record<string, SalonConfig> = {
  [lekkoscConfig.slug]: lekkoscConfig,
};

export const defaultSalonSlug = lekkoscConfig.slug;
