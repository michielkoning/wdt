import { z } from 'zod'
import type { Activity } from '~~/shared/types/Activity'

export const UpcomingActivitiesSchema = z.array(
  z.object({
    id: z.number(),
    title: z.object({
      rendered: z.string(),
    }),
    acf: z.object({
      date: z.string(),
    }),
    slug: z.string(),
  }).transform((item): Activity => {
    return {
      slug: item.slug,
      id: item.id,
      title: item.title.rendered,
      date: item.acf.date,
      type: 'activity',
    }
  }),
)
