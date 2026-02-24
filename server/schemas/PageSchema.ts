import { z } from 'zod'

export const PageSchema: z.ZodType<Page | undefined> = z.array(
  z.object({
    id: z.number(),
    title: z.object({
      rendered: z.string(),
    }),
    content: z.object({
      rendered: z.string(),
    }),
  }).transform((item): Page => {
    return {
      id: item.id,
      title: item.title.rendered,
      content: item.content.rendered,
    }
  }),
).transform((val) => {
  if (val.length) {
    return val[0]
  }
  return undefined
})
