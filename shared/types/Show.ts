import type { Image } from './Image'
import type { Taxonomy } from './Taxonomy'
import type { Comment } from './Comment'

export type Show = {
  id: number
  title: string
  content: string
  image?: Image
  directors: Taxonomy[]
  authors: Taxonomy[]
  gallery: Image[]
  comments: Comment[]
  dates: string[]
}
