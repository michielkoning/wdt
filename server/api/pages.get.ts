import { safeParse, z } from 'zod'
import { PagesSchema } from '../schemas/PagesSchema'

const querySchema = z.object({
  parentId: z.coerce.number(),
})

export default defineCachedEventHandler(async (event) => {
  const query = await getValidatedQuery(event, input => safeParse(querySchema, input))

  if (!query.success) {
    throw createError({
      message: z.prettifyError(query.error),
    })
  }

  const url = getUrl({
    parent: query.data.parentId,
    type: 'pages',
    fields: ['title', 'content'],
    order: 'asc',
    orderby: 'menu_order',
  })

  const response = await $fetch(url)

  const data = parseData(response, PagesSchema)
  if (!data) {
    throw createError({
      message: 'Not found',
    })
  }
  return data
}, {
  maxAge: 60 * 60,
  staleMaxAge: 60 * 60 * 24,
})
