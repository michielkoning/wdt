import { z } from 'zod'
import { ImageSchema } from './ImageSchema'

export const ShowsSchema = z.object({
  totalPages: z.coerce.number(),
  items: z.array(
    z.object({
      id: z.number(),
      title: z.object({
        rendered: z.string(),
      }).transform(val => parseTitle(val.rendered)),
      slug: z.string(),
      _embedded: z.object({
        'wp:featuredmedia': z.array(ImageSchema).default([]),
      }).default({
        'wp:featuredmedia': [],
      }),
      acf: z.object({ banner: z.literal(false).or(
        z.object({
          id: z.number(),
          width: z.number(),
          height: z.number(),
          alt: z.string(),
          url: z.url(),
        }))
        .transform((val) => {
          if (val === false) {
            return undefined
          }
          return val
        }),
      }),
    }),
  ).transform(val => val.map((item) => {
    return {
      id: item.id,
      slug: item.slug,
      title: item.title,
      image: getFeaturedImage(item._embedded['wp:featuredmedia']),
      banner: item.acf.banner
        ? {
            id: item.acf.banner.id,
            alt: item.acf.banner.alt,
            width: item.acf.banner.width,
            height: item.acf.banner.height,
            src: item.acf.banner.url,

          }
        : undefined,
    }
  })),
})
