import { z } from "zod";

// Polish phone: optional +48, 9 digits, optional spaces/dashes
const phoneRegex = /^(\+?48[\s-]?)?(\d{3}[\s-]?\d{3}[\s-]?\d{3})$/;

export const detailsSchema = z.object({
  name: z.string().trim().min(2, "Wpisz imię i nazwisko"),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Wpisz poprawny numer telefonu"),
  email: z.string().trim().email("Wpisz poprawny adres email"),
  notes: z.string().trim().max(500).optional(),
  rodo: z.literal(true, { message: "Zgoda jest wymagana" }),
});

export type DetailsFormValues = z.input<typeof detailsSchema>;
export type DetailsValidatedValues = z.output<typeof detailsSchema>;
