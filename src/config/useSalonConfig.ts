import type { SalonConfig } from "./salon.types";
import { defaultSalonSlug, salonRegistry } from "./salons";

/**
 * Returns the active SalonConfig. Today resolves to the default tenant;
 * future multi-tenant resolution (subdomain, route param, env) plugs in here.
 */
export function useSalonConfig(): SalonConfig {
  return salonRegistry[defaultSalonSlug];
}
