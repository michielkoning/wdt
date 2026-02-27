import { safeParse, z } from 'zod'
import { ShowsSchema } from '../schemas/ShowsSchema'

const querySchema = z.object({
  page: z.coerce.number().default(1),
  search: z.string().optional(),
  directors: z.coerce.number().transform(val => [val]).or(z.array(z.coerce.number())).optional(),
  authors: z.coerce.number().transform(val => [val]).or(z.array(z.coerce.number())).optional(),
})

export default defineCachedEventHandler(async (event): Promise<ShowList> => {
  const query = await getValidatedQuery(event, input => safeParse(querySchema, input))

  if (!query.success) {
    throw createError({
      message: z.prettifyError(query.error),
    })
  }

  const url = getUrl({
    page: query.data.page,
    search: query.data.search,
    directors: query.data.directors,
    authors: query.data.authors,
    pageSize: 12,
    image: true,
    type: 'shows',
    fields: ['title', 'slug', 'excerpt'],
  })

  const response = await $fetch.raw(url)

  return parseData({
    items: response._data,
    totalPages: response.headers.get('X-WP-TotalPages'),
  }, ShowsSchema)
}, {
  shouldBypassCache: async (event) => {
    const query = await getValidatedQuery(event, input => safeParse(querySchema, input))
    if (!query.success) {
      return true
    }
    if (query.data.authors) {
      return true
    }
    if (query.data.directors) {
      return true
    }
    if (query.data.search) {
      return true
    }
    return false
  },
})
