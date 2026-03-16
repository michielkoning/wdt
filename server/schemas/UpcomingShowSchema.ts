import { z } from 'zod'
import { ImageSchema } from './ImageSchema'

export const UpcomingShowSchema = z.array(
  z.object({
    id: z.number(),
    title: z.object({
      rendered: z.string(),
    }).transform(val => parseTitle(val.rendered)),
    excerpt: z.object({
      rendered: z.string(),
    }),
    acf: z.object({
      dates: z.literal(false).or(z.array(z.object({
        date: z.string(),
      })))
        .transform((val) => {
          if (val === false) {
            return []
          }
          return val
        }),
      banner: z.literal(false).or(
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
    slug: z.string(),
    _embedded: z.object({
      'wp:featuredmedia': z.array(ImageSchema).default([]),
    }).default({
      'wp:featuredmedia': [],
    }),
  }).transform((item) => {
    return {
      excerpt: item.excerpt.rendered,
      id: item.id,
      title: item.title,
      dates: item.acf.dates.map(item => item.date),
      slug: item.slug,
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
  }),
).transform((items) => {
  const entries: {
    date: string
    id: number
  }[] = []
  items.forEach((item) => {
    item.dates.forEach((subItem) => {
      entries.push({
        date: subItem,
        id: item.id,
      })
    })
  })
  const sortedEntries = entries.filter(item => new Date(item.date) > new Date())
  if (!sortedEntries.length) {
    return undefined
  }
  return items.find(item => sortedEntries[0]?.id === item.id)
})
