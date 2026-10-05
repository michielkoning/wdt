import { z } from 'zod'
import { acfImageSchema, ImageSchema } from '~~/shared/schemas/ImageSchema'

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
      acf: z.object({ banner: z.literal(false).or(acfImageSchema)
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
      banner: item.acf.banner,
    }
  })),
})
