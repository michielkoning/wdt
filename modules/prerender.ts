import { ofetch } from 'ofetch'
import { defineNuxtModule, addPrerenderRoutes } from 'nuxt/kit'
import { S } from 'vue-router/dist/options-D40y7AuF.mjs'

const PAGESIZE = 20
// const PAGESIZE = 99
const FETCH_TIMEOUT = 0

const pauseFetching = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, FETCH_TIMEOUT)
  })
}

const defaultRoutes = [
  '/',
  '/voorstellingen',
]
export default defineNuxtModule({
  hooks: {
    'build:before': async () => {
      if (process.env.NODE_ENV === 'development') {
        return
      }

      const baseURL = 'https://test.wdttoneel.nl/'

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

          addPrerenderRoutes(urls)
          if (page >= totalPages) {
            hasNextPage = false
          }
          page = page + 1
          pauseFetching()
        }
      }
      await fetchPagesByType('shows')
      // await fetchPagesByType('posts')
      await fetchPagesByType('pages')
    },

    'close': (nuxt) => {
      if (!nuxt.options._prepare) process.exit()
    },
  },
})
