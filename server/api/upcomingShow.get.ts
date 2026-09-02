import { UpcomingShowSchema } from '../schemas/UpcomingShowSchema'

export default defineEventHandler(async (event) => {
  const url = getUrl({
    image: true,
    type: 'shows',
    fields: ['title', 'acf', 'slug', 'excerpt'],
    pageSize: 5,
  })

  const response = await $fetch(url)

  const data = parseData(response, UpcomingShowSchema)
  if (!data) {
    setResponseStatus(event, 204)
  }

  return data
})
