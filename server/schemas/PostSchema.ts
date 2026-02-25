import { z } from 'zod'
import { ImageSchema } from './ImageSchema'

export const PostSchema = z.array(
  z.object({
    id: z.number(),
    title: z.object({
      rendered: z.string(),
    }),
    content: z.object({
      rendered: z.string(),
    }),
    date: z.string(),
    _embedded: z.object({
      'wp:featuredmedia': z.array(ImageSchema).default([]),
    }).default({
      'wp:featuredmedia': [],
    }),
  }).transform((item) => {
    return {
      content: item.content.rendered,
      id: item.id,
      title: item.title.rendered,
      date: item.date,
      image: getFeaturedImage(item._embedded['wp:featuredmedia']),

    }
  }),
).transform((val) => {
  if (val.length) {
    return val[0]
  }
  return undefined
})
