import { z } from 'zod'
import type { Activity } from '~~/shared/types/Activity'

export const UpcomingActivitiesSchema = z.array(
  z.object({
    id: z.number(),
    title: z.object({
      rendered: z.string(),
    }).transform(val => val.rendered.replaceAll('&#038;', '&')),
    acf: z.object({
      date: z.string(),
    }),
    slug: z.string(),
  }).transform((item): Activity => {
    return {
      slug: item.slug,
      id: item.id,
      title: item.title,
      date: item.acf.date,
      type: 'post',
    }
  }),
)
