import z from 'zod'

export const parseData = <T extends z.ZodTypeAny>(data: unknown, schema: T) => {
  const parsed = schema.safeParse(data)

  if (!parsed.success) {
    throw createError({
      message: z.prettifyError(parsed.error),
    })
  }

  return parsed.data as z.infer<T>
}
