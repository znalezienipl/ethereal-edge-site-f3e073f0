import type { SalonConfig } from "@/config/salon.types";

export function buildBeautySalonJsonLd(config: SalonConfig): string {
  const json = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: config.brand.name,
    description: config.seo.description,
    image: config.seo.ogImage,
    telephone: config.contact.phone,
    email: config.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.location.addressLines.join(", "),
      addressLocality: config.location.city,
      postalCode: config.location.postalCode,
      addressCountry: config.location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: config.location.geo.lat,
      longitude: config.location.geo.lng,
    },
    openingHours: config.location.hours.map((h) => `${h.day} ${h.value}`),
    sameAs: [config.contact.instagramUrl, config.contact.booksyUrl].filter(Boolean),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: config.reviews.booksy.rating,
      reviewCount: config.reviews.booksy.count,
    },
  };
  return JSON.stringify(json);
}
