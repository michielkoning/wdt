import { z } from 'zod'
import { ImageSchema } from './ImageSchema'

export const ShowsSchema = z.object({
  totalPages: z.coerce.number(),
  items: z.array(
    z.object({
      id: z.number(),
      title: z.object({
        rendered: z.string(),
      }).transform(val => val.rendered.replaceAll('&#038;', '&')),
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
      title: item.title,
      image: getFeaturedImage(item._embedded['wp:featuredmedia']),
    }
  })),
})
