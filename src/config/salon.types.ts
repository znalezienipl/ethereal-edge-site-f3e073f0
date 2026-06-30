import { z } from "zod";

export const serviceCategorySchema = z.enum([
  "twarz",
  "brwi-rzesy",
  "makijaz-permanentny",
  "pielegnacja",
]);
export type ServiceCategory = z.infer<typeof serviceCategorySchema>;

export const serviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: serviceCategorySchema,
  price: z.number().int().nonnegative(),
  originalPrice: z.number().int().nonnegative().optional(),
  durationMin: z.number().int().positive(),
  shortDesc: z.string(),
  imageUrl: z.string().optional(),
});
export type Service = z.infer<typeof serviceSchema>;

export const specialistSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  portraitUrl: z.string().optional(),
});
export type Specialist = z.infer<typeof specialistSchema>;

export const pillarSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  body: z.string(),
});
export type Pillar = z.infer<typeof pillarSchema>;

export const quoteSchema = z.object({
  text: z.string(),
  author: z.string(),
});
export type Quote = z.infer<typeof quoteSchema>;

export const salonConfigSchema = z.object({
  slug: z.string(),
  brand: z.object({
    name: z.string(),
    tagline: z.string(),
    logoUrl: z.string().optional(),
  }),
  hero: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    cta: z.string(),
    imageUrl: z.string().optional(),
  }),
  about: z.object({
    specialistName: z.string(),
    role: z.string(),
    portraitUrl: z.string().optional(),
    bio: z.string(),
    signatureLine: z.string(),
  }),
  specialists: z.array(specialistSchema).min(1),
  services: z.array(serviceSchema).min(1),
  gallery: z.array(z.string()),
  experience: z.object({ pillars: z.array(pillarSchema).length(4) }),
  reviews: z.object({
    booksy: z.object({ rating: z.number(), count: z.number().int() }),
    google: z.object({ rating: z.number(), count: z.number().int() }).optional(),
    quotes: z.array(quoteSchema).min(1),
  }),
  location: z.object({
    addressLines: z.array(z.string()).min(1),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
    mapEmbedUrl: z.string(),
    hours: z.array(z.object({ day: z.string(), value: z.string() })),
    parking: z.string().optional(),
    directionsUrl: z.string(),
    geo: z.object({ lat: z.number(), lng: z.number() }),
  }),
  contact: z.object({
    phone: z.string(),
    email: z.string().email(),
    instagram: z.string().optional(),
    instagramUrl: z.string().optional(),
    booksyUrl: z.string().optional(),
  }),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    ogImage: z.string().optional(),
    locale: z.string().default("pl_PL"),
  }),
});

export type SalonConfig = z.infer<typeof salonConfigSchema>;
