import { z } from "zod";

const phone = /^\+?[\d\s()-]{8,20}$/;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "name").max(120),
  contact: z
    .string()
    .trim()
    .max(160)
    .refine((v) => z.email().safeParse(v).success || phone.test(v), "contact"),
  area: z.string().max(80).optional().default(""),
  message: z.string().trim().min(10, "message").max(4000),
  consent: z.literal(true, { error: "consent" }),
  /** Campo trampa para bots: debe llegar vacío. */
  company: z.string().max(0).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
