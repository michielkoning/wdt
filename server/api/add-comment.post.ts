import z from 'zod'

const bodySchema = z.object({
  name: z.string(),
  email: z.email(),
  id: z.coerce.number(),
  comment: z.string(),
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, input => z.safeParse(bodySchema, input))
  const ip = getRequestIP(event)

  if (!body.success) {
    throw createError({
      message: z.prettifyError(body.error),
    })
  }

  const { user, password, apiUrl } = useRuntimeConfig()

  const credentials = `${user}:${password}`

  const key = Buffer.from(credentials, 'utf8').toString('base64')

  await $fetch('comments', {
    baseURL: apiUrl,
    method: 'POST',
    body: {
      author_name: body.data.name,
      content: body.data.comment,
      post: body.data.id,
      author_email: body.data.email,
      author_ip: ip,
    },
    headers: {
      Authorization: `Basic ${key}`,
    },
  }).catch((error) => {
    throw createError({
      statusText: error.data.message,
    })
  })

  setResponseStatus(event, 204)
})
