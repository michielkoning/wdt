const formatDate = (date: Date) => {
  const yyyy = date.getFullYear()
  let mm: string | number = date.getMonth() + 1 // month is zero-based
  let dd: string | number = date.getDate()

  if (dd < 10) dd = '0' + dd
  if (mm < 10) mm = '0' + mm

  return `${yyyy}-${mm}-${dd}`
}

export const getUrl = ({
  fields,
  type,
  id,
  slug,
  page,
  image,
  directors = [],
  authors = [],
  include,
  exclude,
  pageSize,
  search,
  parent,
  productCategory,
  date,
  dateBefore,
  dateAfter,

  orderby,
  order,
  locale,
}: {
  fields: string[]
  type: 'posts' | 'pages' | 'shows' | 'directors' | 'authors' | 'activities'
  id?: string
  slug?: string
  page?: number
  image?: boolean
  include?: number[]
  exclude?: number
  directors?: number[]
  authors?: number[]
  pageSize?: number
  search?: string
  parent?: number
  productCategory?: string
  date?: string
  dateBefore?: Date
  dateAfter?: Date
  orderby?: 'menu_order' | 'title'
  order?: 'asc' | 'desc'
  locale?: string
}) => {
  // const { apiUrl } = useAppConfig()
  const apiUrl = 'http://wdt.local/wp-json/'

  const baseUrl = `${apiUrl}wp/v2/${type}/`

  const url = new URL(baseUrl)
  if (image) {
    url.searchParams.set('_embed', 'true')
    fields.push('_links')
    fields.push('_embedded')
    fields.push('wp:featuredmedia')
  }
  const allFields = ['id', ...fields]
  url.searchParams.set('status', 'publish')
  url.searchParams.set('_fields', allFields.join(','))
  if (fields.includes('acf')) {
    url.searchParams.set('acf_format', 'standard')
  }
  if (slug) {
    url.searchParams.set('slug', slug)
  }
  if (id) {
    url.searchParams.set('id', id)
  }
  if (directors.length) {
    url.searchParams.set('directors', directors.join(','))
  }
  if (authors.length) {
    url.searchParams.set('authors', authors.join(','))
  }
  if (search) {
    url.searchParams.set('search', search)
  }
  if (parent) {
    url.searchParams.set('parent', parent.toString())
  }
  if (exclude) {
    url.searchParams.set('exclude', exclude.toString())
  }
  if (include) {
    url.searchParams.set('include', include.join(','))
  }
  if (page) {
    url.searchParams.set('page', page.toString())
  }
  if (date) {
    url.searchParams.set('date', date)
  }
  if (dateBefore) {
    url.searchParams.set('date_before', formatDate(dateBefore))
  }
  if (dateAfter) {
    url.searchParams.set('date_after', formatDate(dateAfter))
  }
  if (pageSize) {
    url.searchParams.set('per_page', pageSize.toString())
  }
  if (locale) {
    url.searchParams.set('lang', locale)
  }
  if (orderby) {
    url.searchParams.set('orderby', orderby)
    url.searchParams.set('order', order ?? 'asc')
  }

  if (productCategory) {
    url.searchParams.set('category', productCategory.toString())
  }

  console.log(url.href)
  return url.toString()
}
