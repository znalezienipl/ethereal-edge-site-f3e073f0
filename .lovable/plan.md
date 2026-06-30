
# Lekkość Beauty Center — Luxury Editorial Template (final plan, v3)

Production-grade, config-driven luxury salon site. Magazine, not web app. Polish UI. Booking is frontend-only with a clean abstraction for later Cloud swap. Architecture is ready for dozens of salons.

## Non-negotiable rules absorbed

- Whitespace over content. Empty is correct.
- No invented UI patterns. No decorative lines, icons, backgrounds, borders, shadows, gradients.
- Hierarchy only from typography scale, spacing, image size, layout position.
- Emotionally calm. No urgency. No conversion patterns.
- Components < 150 lines, focused, no `any`, no hardcoded copy.

## Design system

- **Type**: Cormorant Garamond (display) + Inter (body) via `@fontsource`. Body max 65ch, line-height 1.7.
- **Tokens** in `src/styles.css` (oklch): warm off-white background `#FAF8F5`, near-black foreground, primary muted forest `#2D5A3D`, accent warm sand `#C8B99A`. Hairline borders only for inputs/calendar.
- **Spacing**: 8px scale. Section rhythm 160–200px desktop / 96px mobile. ≥60% negative space per viewport.
- **Radius**: 0–4px.
- **Motion** (Framer Motion): fade + 12px slide-up, image mask reveal, 600–800ms ease-out. Hover: brightness lift, ≤1.02 image scale, left→right underline. `prefers-reduced-motion` disables reveals.

## Architecture (scalable to dozens of salons)

```text
src/
  config/
    salons/
      lekkosc.ts            single salon config (typed)
      index.ts              registry: { [slug]: SalonConfig }
    salon.types.ts          SalonConfig type + Zod schema
    useSalonConfig.ts       hook → active salon (defaults to lekkosc)
  content/
    pl.ts                   shared UI strings (nav, form labels, errors, CTAs)
    useT.ts                 typed translator hook
  lib/
    booking/
      schema.ts             Zod schemas for booking steps
      submitBooking.ts      stub; one function body to swap to Cloud
      availability.ts       mock slot generator
      types.ts
    seo/
      buildJsonLd.ts        BeautySalon Schema.org from SalonConfig
      buildMeta.ts          route head() helper
    format/
      price.ts, date.ts, phone.ts
  components/
    salon/
      primitives/
        Eyebrow.tsx
        SerifHeadline.tsx
        Prose.tsx
        LuxButton.tsx
        LuxLink.tsx
        EditorialImage.tsx   lazy, aspect-ratio, mask reveal
        SectionFrame.tsx
        Reveal.tsx           Framer Motion wrapper, honors reduced motion
      layout/
        Navigation.tsx
        Footer.tsx
      sections/
        Hero.tsx
        About.tsx
        RitualsShowcase.tsx
        Gallery.tsx
        Experience.tsx
        Reviews.tsx
        Location.tsx
      booking/
        BookingFlow.tsx              orchestrator, < 150 lines
        StepIndicator.tsx
        steps/
          ServiceStep.tsx
          SpecialistStep.tsx
          DateStep.tsx
          TimeStep.tsx
          DetailsStep.tsx
          ConfirmationStep.tsx
        useBookingMachine.ts         step state + validation per step
  routes/
    __root.tsx                       fonts, JSON-LD, no shared layout chrome here
    index.tsx                        home (all sections)
    uslugi.tsx                       services index
    rezerwacja.tsx                   booking
    kontakt.tsx                      contact
```

Every section is a pure component receiving its config slice via props — no global imports of `salon.config` inside sections. Swapping `useSalonConfig()` source (env, subdomain, route param) enables multi-tenant later with zero component edits.

## SalonConfig (typed, Zod-validated)

```text
SalonConfig {
  slug, brand{name, tagline, logoUrl, primary, accent}
  hero{eyebrow, headline, cta, imageUrl}
  about{specialistName, role, portraitUrl, bio, signatureLine}
  services: Service[]   // id, name, category, price, originalPrice?, duration, shortDesc, imageUrl
  gallery: string[]
  experience{pillars: Pillar[4]}   // eyebrow, title, body
  reviews{booksy{rating,count}, google{rating,count}, quotes: Quote[]}
  location{address, mapEmbedUrl, hours, parking, directionsUrl, geo{lat,lng}}
  contact{phone, email, instagram, booksyUrl}
  seo{title, description, ogImage, locale:'pl_PL'}
}
```

Seeded `lekkosc.ts`: Yuliya Arutsiunian · ul. Krzywa 8, L2 · Kraków · Booksy 5.0/69 · 13 services with first-visit discount as `originalPrice`.

## Section compositions (each distinct, no decoration)

- **Hero** — full-bleed image 60% right, type column 40% left: eyebrow · large serif headline · one CTA. Mask reveal. Massive top margin.
- **O Salonie** — large portrait left at 5/6 vh, bio column right offset 1/3 down. Off-grid bleed left.
- **Rytuały** — horizontal snap-scroll desktop, vertical stack mobile. One service per viewport.
- **Galeria** — strict 3-column grid, identical row aspect ratios, generous gutters. No captions.
- **Doświadczenie** — 4 pillars asymmetric (1 large + 3 small). No icons, no boxes.
- **Opinie** — one oversized serif quote, large opening mark, 2 secondary quotes. Ratings as a thin numeric metadata line — no stars, no badges.
- **Lokalizacja** — split: map left, minimal info right.
- **Footer** — logo · 3 sparse columns · Instagram · copyright. Single hairline top.

## Booking flow (`/rezerwacja`)

5 steps + confirmation, one decision per screen. Slim text indicator ("1 z 5"). Framer Motion page transitions.

1. Usługa (categorised)
2. Specjalistka
3. Data (shadcn Calendar, `pl` locale, Monday start)
4. Godzina (mock availability from `availability.ts`)
5. Twoje dane (RHF + Zod: imię, telefon PL, email, notatka, RODO)
→ Potwierdzenie

`useBookingMachine` encapsulates step state, per-step validation, and back/next. `submitBooking()` returns success; swapping to Cloud is one function body.

## Polish copy (within budget)

- Nav: Salon · Rytuały · Galeria · Kontakt · **Umów wizytę**
- Hero: "Lekkość · Kraków" / "Pielęgnacja w jej najczystszej formie." / "Umów wizytę"
- Pillars: Spokój · Precyzja · Troska · Rytuał
- Footer: "© 2026 Lekkość Beauty Center · Kraków"

All UI strings live in `src/content/pl.ts`. Per-salon copy lives in the salon config. Zero hardcoded strings in components.

## Imagery

Until user uploads: neutral warm-tone placeholder at correct aspect ratio with tiny serif label "Zdjęcie wkrótce". No stock photos. `loading="lazy"` on all `<img>`; hero gets `fetchpriority="high"` + preload link.

## SEO & accessibility

- Per-route `head()`: Polish title, description, og:title, og:description. `og:image` only at leaf routes (never root).
- `BeautySalon` JSON-LD built from SalonConfig in `__root.tsx`.
- Semantic landmarks, single `<main>`, skip link, focus-visible rings in `--primary`.
- `prefers-reduced-motion` honored. Font preload, `font-display: swap`.
- Lighthouse target 95+, LCP < 2.5s, CLS < 0.1.

## Engineering standards

- TypeScript strict, no `any`, no `as` on inferred values, Zod for runtime boundaries.
- Each component < 150 lines, single responsibility.
- Shared logic in hooks (`useBookingMachine`, `useSalonConfig`, `useT`, `useReveal`).
- No duplicated layout primitives — `SectionFrame`, `EditorialImage`, `Reveal` reused everywhere.
- No business logic in route files — routes compose sections only.
- All copy via `useT()` or `SalonConfig`; ESLint guard against literal Polish in JSX (lightweight rule, optional).

## Stack additions

`@fontsource/cormorant-garamond`, `@fontsource/inter`, `framer-motion`, `react-hook-form`, `zod`, `@hookform/resolvers`, `date-fns` (already common; for `pl` locale formatting).

## Out of scope (this pass)

- Real reservation persistence (Cloud deferred)
- AI image generation (user uploading)
- Language switcher (Polish only)
- CMS UI (config file is the editing surface)
- Subdomain-based multi-tenant routing (architecture supports it; not wired)

## Deliverable

A calm, restrained, magazine-grade salon template. Editing only `src/config/salons/lekkosc.ts` produces an entirely different luxury salon — no component edits. The folder shape, typed config, and translator hook are ready to host dozens of salons under one codebase.
