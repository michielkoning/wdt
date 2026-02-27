import { z } from 'zod'
import type { Activity } from '~~/shared/types/Activity'

export const UpcomingShowsSchema = z.array(
  z.object({
    id: z.number(),
    title: z.object({
      rendered: z.string(),
    }).transform(val => val.rendered.replaceAll('&#038;', '&')),
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
    }),
    slug: z.string(),
  }).transform((item) => {
    return {
      id: item.id,
      title: item.title,
      dates: item.acf.dates.map(item => item.date),
      slug: item.slug,
    }
  }),
).transform((items) => {
  const entries: Activity[] = []
  items.forEach((item) => {
    item.dates.forEach((subItem) => {
      entries.push({
        date: subItem,
        slug: item.slug,
        title: item.title,
        id: item.id,
        type: 'show',
      })
    })
  })
  return entries.filter(item => new Date(item.date) > new Date())
})
