import { safeParse, z } from 'zod'
import { ShowSchema } from '../schemas/ShowSchema'

const querySchema = z.object({
  slug: z.string(),
})

export default defineEventHandler(async (event): Promise<Show> => {
  const query = await getValidatedQuery(event, body => safeParse(querySchema, body))

  if (!query.success) {
    throw createError({
      message: z.prettifyError(query.error),
    })
  }

  const url = getUrl({
    slug: query.data.slug,
    image: true,
    type: 'shows',
    fields: ['title', 'content', 'acf', 'excerpt'],
  })

  const response = await $fetch(url)

  const data = parseData(response, ShowSchema)
  if (!data) {
    throw createError({
      message: 'Not found',
    })
  }

  return data
})
