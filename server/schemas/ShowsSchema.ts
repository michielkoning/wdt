import { z } from 'zod'
import { ImageSchema } from './ImageSchema'

export const ShowsSchema = z.array(
  z.object({
    id: z.number(),
    title: z.object({
      rendered: z.string(),
    }),
    slug: z.string(),
    _embedded: z.object({
      'wp:featuredmedia': z.array(ImageSchema).default([]),
    }).default({
      'wp:featuredmedia': [],
    }),
  }),
).transform(val => val.map((item) => {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title.rendered,
    image: getFeaturedImage(item._embedded['wp:featuredmedia']),
  }
}))
