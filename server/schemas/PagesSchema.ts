import { z } from 'zod'

export const PagesSchema: z.ZodType<Page[]> = z.array(
  z.object({
    id: z.number(),
    title: z.object({
      rendered: z.string(),
    }).transform(val => parseTitle(val.rendered)),
    content: z.object({
      rendered: z.string(),
    }),
  }).transform((item): Page => {
    return {
      id: item.id,
      title: item.title,
      content: item.content.rendered,
    }
  }),
)
