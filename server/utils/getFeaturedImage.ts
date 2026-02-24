import type { z } from 'zod'
import type { ImageSchema } from '../schemas/ImageSchema'

export const getFeaturedImage = (
  featuredImage: z.infer<typeof ImageSchema>[],
) => {
  if (!featuredImage.length) {
    return undefined
  }
  const image = featuredImage[0]

  if (!image) {
    return undefined
  }

  const result: Image = {
    id: image.id,
    alt: image.alt_text,
    width: image.media_details.width,
    height: image.media_details.height,
    src: image.source_url,
  }
  return result
}
