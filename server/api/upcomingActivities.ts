import { UpcomingActivitiesSchema } from '../schemas/UpcomingActivitiesSchema'

export default defineCachedEventHandler(async () => {
  const url = getUrl({
    type: 'posts',
    fields: ['title', 'acf', 'slug'],
    dateAfter: new Date(),
  })

  const response = await $fetch(url)

  const data = parseData(response, UpcomingActivitiesSchema)
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
