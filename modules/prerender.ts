import { ofetch } from 'ofetch'
import { defineNuxtModule, addPrerenderRoutes } from 'nuxt/kit'

const PAGESIZE = 10

const defaultRoutes = [
  '/',
  '/nieuws',
]
export default defineNuxtModule({
  hooks: {
    'build:before': async () => {
      if (process.env.NODE_ENV === 'development') {
        return
      }

      const baseURL = process.env.NUXT_API_URL ?? ''

      addPrerenderRoutes(defaultRoutes)

      const fetchPagesByType = async (
        type: 'posts' | 'shows' | 'pages',
      ) => {
        let hasNextPage = true
        let page = 1
        while (hasNextPage) {
          const apiUrl = `wp-json/wp/v2/${type}/?_fields=link&per_page=${PAGESIZE}&page=${[
            page,
          ]}&status=publish`
          const response = await ofetch
            .raw(apiUrl, {
              baseURL,
            })
            .catch(error => error.data)

          const totalPages = Number(response.headers.get('X-WP-TotalPages'))
          const urls = response._data.map((r: { link: string }) => {
            return r.link.replace(baseURL, '/')
          }) as string[]

          const prerenderRoutes = urls.filter((url) => {
            const excludeUrls = [
              '/geschiedenis/2021-2030/',
              '/geschiedenis/1981-2008/',
              '/geschiedenis/1946-1980/',
              '/geschiedenis/1908-1941/',
              '/voorstellingen/vijfmaal-verrassend/de-heldentenor/',
              '/voorstellingen/vijfmaal-verrassend/een-lichte-lunch/',
              '/voorstellingen/vijfmaal-verrassend/puntgaaf/',
              '/voorstellingen/vijfmaal-verrassend/wat-jij-niet-allemaal-weet/',
            ]
            return !excludeUrls.includes(url)
          })
          addPrerenderRoutes(prerenderRoutes)
          if (page >= totalPages) {
            hasNextPage = false
          }
          page = page + 1
        }
      }
      await fetchPagesByType('shows')
      await fetchPagesByType('posts')
      await fetchPagesByType('pages')
    },

    'close': (nuxt) => {
      if (!nuxt.options._prepare) process.exit()
    },
  },
})
