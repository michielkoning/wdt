import type { z } from 'zod'
import type { ImageSchema } from '~~/shared/schemas/ImageSchema'

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

  const getSrcset = (image?: { source_url: string, width: number }) => {
    if (!image) {
      return undefined
    }
    return `${image.source_url} ${image.width}w`
  }

  const { sizes } = image.media_details

  const srcSets = [
    getSrcset(sizes.medium),
    getSrcset(sizes.medium_large),
    getSrcset(sizes.large),
    getSrcset(sizes.full),
  ]

  const result: Image = {
    id: image.id,
    alt: image.alt_text,
    width: image.media_details.width,
    height: image.media_details.height,
    src: image.source_url,
    srcset: srcSets.filter(i => i !== undefined).join(),
  }
  return result
}
