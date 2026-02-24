import { safeParse, z } from 'zod'
import { ActivitySchema } from '../schemas/ActivitySchema'

const querySchema = z.object({
  slug: z.string(),
})

export default defineEventHandler(async (event): Promise<Page> => {
  const query = await getValidatedQuery(event, body => safeParse(querySchema, body))

  if (!query.success) {
    throw createError({
      message: z.prettifyError(query.error),
    })
  }

  const url = getUrl({
    slug: query.data.slug,
    image: true,
    type: 'activities',
    fields: ['title', 'content', 'acf'],
  })

  const response = await $fetch(url)

  const data = parseData(response, ActivitySchema)
  if (!data) {
    throw createError({
      message: 'Not found',
    })
  }

  return data
})
