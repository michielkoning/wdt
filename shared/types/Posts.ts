import type { Image } from './Image'

export type PostListItem = {
  id: number
  title: string
  excerpt: string
  image?: Image
  date: string
  slug: string
}

export type PostList = {
  items: PostListItem[]
  totalPages: number
}
