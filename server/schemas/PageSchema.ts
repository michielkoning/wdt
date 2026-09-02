import { z } from 'zod'
import { ImageSchema } from './ImageSchema'

export const PageSchema: z.ZodType<Page | undefined> = z.array(
  z.object({
    id: z.number(),
    title: z.object({
      rendered: z.string(),
    }),
    content: z.object({
      rendered: z.string(),
    }),
    _embedded: z.object({
      'wp:featuredmedia': z.array(ImageSchema).default([]),
    }).default({
      'wp:featuredmedia': [],
    }),
  }).transform((item): Page => {
    return {
      id: item.id,
      title: item.title.rendered,
      content: item.content.rendered,
      image: getFeaturedImage(item._embedded['wp:featuredmedia']),
    }
  }),
).transform((val) => {
  if (val.length) {
    return val[0]
  }
  return undefined
})
