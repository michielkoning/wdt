import type { Image } from './Image'

export type Shows = {
  id: number
  title: string
  image?: Image
  slug: string
}[]
