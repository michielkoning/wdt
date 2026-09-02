import { UpcomingShowsSchema } from '../schemas/UpcomingShowsSchema'

export default defineEventHandler(async () => {
  const url = getUrl({
    type: 'shows',
    fields: ['title', 'acf', 'slug'],
    pageSize: 5,
  })

  const response = await $fetch(url)

  const data = parseData(response, UpcomingShowsSchema)
  if (!data) {
    throw createError({
      message: 'Not found',
    })
  }

  return data
})
