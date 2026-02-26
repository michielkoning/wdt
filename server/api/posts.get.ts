import { safeParse, z } from 'zod'
import { PostsSchema } from '../schemas/PostsSchema'

const querySchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(6),
  excludeId: z.coerce.number().optional(),
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
    pageSize: query.data.pageSize,
    exclude: query.data.excludeId,
    image: true,
    type: 'posts',
    fields: ['title', 'slug', 'excerpt', 'date'],
  })

  const response = await $fetch.raw(url)

  return parseData({
    items: response._data,
    totalPages: response.headers.get('X-WP-TotalPages'),
  }, PostsSchema)
})
