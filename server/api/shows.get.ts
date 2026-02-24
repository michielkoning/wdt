import { safeParse, z } from 'zod'
import { ShowsSchema } from '../schemas/ShowsSchema'

const querySchema = z.object({
  page: z.coerce.number().default(1),
  search: z.string().optional(),
  directors: z.coerce.number().transform(val => [val]).or(z.array(z.coerce.number())).optional(),
  authors: z.coerce.number().transform(val => [val]).or(z.array(z.coerce.number())).optional(),
})

export default defineEventHandler(async (event): Promise<Shows> => {
  const query = await getValidatedQuery(event, body => safeParse(querySchema, body))

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

  const response = await $fetch(url)

  return parseData(response, ShowsSchema)
})
