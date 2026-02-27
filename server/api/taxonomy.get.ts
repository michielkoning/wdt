import { safeParse, z } from 'zod'
import { TaxonomySchema } from '../schemas/TaxonomySchema'

const querySchema = z.object({
  type: z.literal(['authors', 'directors']),
})

export default defineCachedEventHandler(async (event): Promise<Taxonomy[]> => {
  const query = await getValidatedQuery(event, input => safeParse(querySchema, input))

  if (!query.success) {
    throw createError({
      message: z.prettifyError(query.error),
    })
  }
  const url = getUrl({
    type: query.data.type,
    fields: ['name'],
  })

  const response = await $fetch(url)

  return parseData(response, TaxonomySchema)
})
