import z from 'zod'

const size = z.object({
  source_url: z.string(),
  width: z.number(),
  height: z.number(),
})

const getSrcset = (images: { url: string, width: number }[]) => {
  const srcset = images.map((image) => {
    return `${image.url} ${image.width}w`
  })
  return srcset.filter(i => i !== undefined).join()
}

export const acfImageSchema = z.object({
  id: z.number(),
  width: z.number(),
  height: z.number(),
  alt: z.string(),
  url: z.url(),
  sizes: z.object({
    'medium': z.string(),
    'medium-width': z.number(),
    'medium_large': z.string(),
    'medium_large-width': z.number(),
    'large': z.string(),
    'large-width': z.number(),
    '1536x1536': z.string(),
    '1536x1536-width': z.number(),
    '2048x2048': z.string(),
    '2048x2048-width': z.number(),
  }).transform((val) => {
    return getSrcset([
      { url: val['medium'], width: val['medium-width'] },
      { url: val['medium_large'], width: val['medium_large-width'] },
      { url: val['large'], width: val['large-width'] },
      { url: val['1536x1536'], width: val['1536x1536-width'] },
      { url: val['2048x2048'], width: val['2048x2048-width'] },
    ])
  }),
}).transform((val) => {
  const result: Image = {
    id: val.id,
    alt: val.alt,
    width: val.width,
    height: val.height,
    src: val.url,
    srcset: val.sizes,
  }
  return result
})

export const ImageSchema = z.object({
  id: z.number(),
  alt_text: z.string().default(''),
  media_details: z.object({
    width: z.number(),
    height: z.number(),
    sizes: z.object({
      medium: size.optional(),
      medium_large: size.optional(),
      large: size.optional(),
      full: size.optional(),
    }),
  }),
  source_url: z.string(),
})
