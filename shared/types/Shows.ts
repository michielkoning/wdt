import type { Image } from './Image'

export type ShowListItem = {
  id: number
  title: string
  image?: Image
  banner?: Image
  slug: string
}

export type ShowList = {
  items: ShowListItem[]
  totalPages: number
}
