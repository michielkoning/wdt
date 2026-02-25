import { safeParse, z } from 'zod'
import { PostsSchema } from '../schemas/PostsSchema'

const querySchema = z.object({
  page: z.coerce.number().default(1),
})

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, body => safeParse(querySchema, body))

  if (!query.success) {
    throw createError({
      message: z.prettifyError(query.error),
    })
  }

  const url = getUrl({
    page: query.data.page,
    image: true,
    type: 'posts',
    fields: ['title', 'slug', 'excerpt', 'date'],
  })

  const response = await $fetch(url)

  return parseData(response, PostsSchema)
})
