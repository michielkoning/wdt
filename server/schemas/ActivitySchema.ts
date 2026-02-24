import { z } from 'zod'

export const ActivitySchema = z.array(
  z.object({
    id: z.number(),
    title: z.object({
      rendered: z.string(),
    }),
    content: z.object({
      rendered: z.string(),
    }),
    acf: z.object({
      date: z.string(),
    }),
  }).transform((item) => {
    return {
      id: item.id,
      title: item.title.rendered,
      content: item.content.rendered,
      date: item.acf.date,
    }
  }),
).transform((val) => {
  if (val.length) {
    return val[0]
  }
  return undefined
})
