import type { z } from 'zod'
import type { ImageSchema } from '~~/shared/schemas/ImageSchema'

export const getFeaturedImage = (
  featuredImage: z.infer<typeof ImageSchema>[],
) => {
  if (!featuredImage.length) {
    return undefined
  }
  return featuredImage[0]
}
