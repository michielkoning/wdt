import { safeParse, z } from 'zod'
import { PostSchema } from '../schemas/PostSchema'

const querySchema = z.object({
  slug: z.string(),
})

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, input => safeParse(querySchema, input))

  if (!query.success) {
    throw createError({
      message: z.prettifyError(query.error),
    })
  }

  const url = getUrl({
    slug: query.data.slug,
    image: true,
    type: 'posts',
    fields: ['title', 'content', 'date'],
  })

  const response = await $fetch(url)

  const data = parseData(response, PostSchema)
  if (!data) {
    throw createError({
      message: 'Not found',
    })
  }

  return data
})
