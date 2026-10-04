import z from 'zod'

export const ImageSchema = z.object({
  id: z.number(),
  alt_text: z.string().default(''),
  media_details: z.object({
    width: z.number(),
    height: z.number(),
  }),
  source_url: z.string(),
})
