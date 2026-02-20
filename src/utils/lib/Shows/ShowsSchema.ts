import { z } from "zod";
import { ImageSchema } from "../Images/imageSchema";

export const ShowsSchema = z.array(
  z.object({
    id: z.number(),
    title: z.object({
      rendered: z.string(),
    }),
    excerpt: z.object({
      rendered: z.string(),
    }),
    slug: z.string().transform((val) => `/voorstellingen/${val}`),
    _embedded: z.object({
      "wp:featuredmedia": z.array(ImageSchema).default([]),
    }).default({
      "wp:featuredmedia": []
    }),
  })
);
