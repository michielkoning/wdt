import { z } from 'zod'
import { ImageSchema } from './ImageSchema'

export const ShowSchema = z.array(
  z.object({
    id: z.number(),
    title: z.object({
      rendered: z.string(),
    }).transform(val => val.rendered.replaceAll('&#038;', '&')),
    content: z.object({
      rendered: z.string(),
    }),
    excerpt: z.object({
      rendered: z.string(),
    }),
    _embedded: z.object({
      'wp:featuredmedia': z.array(ImageSchema).default([]),
      'wp:term': z.array(
        z.array(
          z.object({
            id: z.number(),
            name: z.string(),
            taxonomy: z.literal(['director', 'author']),
          })))
        .transform(val => val.flat()).default([]),
      'replies': z.array(
        z.array(
          z.object({
            id: z.number(),
            author_name: z.string(),
            content: z.object({
              rendered: z.string(),
            }),
            date: z.string(),
          })))
        .transform(val => val.flat()).default([]),
    }).default({
      'wp:featuredmedia': [],
      'wp:term': [],
      'replies': [],
    }),
    acf: z.object({
      gallery: z.literal(false).or(z.array(
        z.object({
          id: z.number(),
          width: z.number(),
          height: z.number(),
          alt: z.string(),
          url: z.url(),
        })))
        .transform((val) => {
          if (val === false) {
            return []
          }
          return val
        }),
      dates: z.literal(false).or(z.array(z.object({
        date: z.string(),
      })))
        .transform((val) => {
          if (val === false) {
            return []
          }
          return val
        }),
    }),
  }).transform((item) => {
    return {
      id: item.id,
      title: item.title,
      excerpt: item.excerpt.rendered,
      content: item.content.rendered,
      image: getFeaturedImage(item._embedded['wp:featuredmedia']),
      directors: item._embedded['wp:term'].filter(item => item.taxonomy === 'director').map((taxonomy) => {
        return {
          id: taxonomy.id,
          name: taxonomy.name,
        }
      }),
      authors: item._embedded['wp:term'].filter(item => item.taxonomy === 'author').map((taxonomy) => {
        return {
          id: taxonomy.id,
          name: taxonomy.name,
        }
      }),
      gallery: item.acf.gallery.map((item) => {
        return {
          id: item.id,
          alt: item.alt,
          width: item.width,
          height: item.height,
          src: item.url,
        }
      }),
      comments: item._embedded.replies.map((item) => {
        return {
          id: item.id,
          author: item.author_name,
          content: item.content.rendered,
          date: item.date,
        }
      }),
      dates: item.acf.dates.map(item => item.date),
    }
  }),
).transform((val) => {
  if (val.length) {
    return val[0]
  }
  return undefined
})
