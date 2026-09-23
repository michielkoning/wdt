import { z } from 'zod'

export const TaxonomySchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
  }),
).transform(val => val.map((item) => {
  return {
    value: item.id,
    title: item.name,
  }
}))
