import type { Image } from './Image'

export type Page = {
  id: number
  title: string
  content: string
  image?: Image
}
