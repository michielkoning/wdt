import type { Image } from './Image'

export type Shows = {
  id: number
  title: string
  image?: Image
  banner?: Image
  slug: string
}[]

export type ShowList = {
  items: Shows
  totalPages: number
}
