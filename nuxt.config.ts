import { ofetch } from 'ofetch'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxtjs/stylelint-module',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@vee-validate/nuxt',
  ],
  components: [
    '~/components/Activities',
    '~/components/Comments',
    '~/components/Home',
    '~/components/Layout',
    '~/components/Posts',
    '~/components/Shows',
    '~/components/Shared',
    '~/components/Wrappers',
  ],
  devtools: {
    enabled: true,
  },
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1,viewport-fit=cover',
        },

        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent',
        },
        { name: 'apple-mobile-web-app-title', content: 'title' },
        { name: 'theme-color', content: '#ac4747' },
      ],
    },
  },
  css: [
    '~/assets/css/base.css',
  ],
  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) =>
        ['search', 'selectedcontent'].includes(tag),
    },
  },
  runtimeConfig: {
    public: {
      apiUrl: '',
    },
  },
  compatibilityDate: '2065-07-15',
  nitro: {
    // routeRules: {
    //   '/**': {
    //     isr: 60 * 60,
    //   },
    //   '/api': {
    //     isr: false,
    //   },
    // },
    // preset: 'netlify',
    // prerender: {
    //   interval: 3000,
    //   concurrency: 5,
    // },
    prerender: {
      crawlLinks: false,
    },
    devStorage: {
      cache: {
        driver: 'fs',
        base: './.nuxt/cache',
      },
    },
    storage: {
      cache: {
        driver: 'fs',
        base: './.nuxt/cache',
        // driver: 'null',
        // driver: 'netlify-blobs',
        // name: 'cache',
      },
    },

  },
  vite: {
    optimizeDeps: {
      include: [
        // '@unhead/schema-org/vue',
        '@vee-validate/i18n',
        '@vee-validate/zod',
        'zod',
      ],
    },
  },
  typescript: {
    typeCheck: true,
  },

  postcss: {
    plugins: {
      'postcss-custom-media-generator': {
        xs: 480,
        sm: 640,
        md: 768,
        lg: 1024,
        xlg: 1240,
      },
      'postcss-mixins': {
        mixinsDir: './app/assets/css/mixins/',
      },

      'postcss-preset-env': {
        browsers: 'last 2 versions',
        stage: 4,

        features: {
          'nesting-rules': true,
          'custom-media-queries': true,
          'media-query-ranges': true,
        },
      },
      'autoprefixer': {},
      'cssnano': {
        preset: [
          'default',
          {
            calc: false,
          },
        ],
      },
    },
  },
  telemetry: false,
  hooks: {
    async 'prerender:routes'(ctx: { routes: Set<string> }) {
      const defaultRoutes = [
        '/',
        '/nieuws',
        '/voorstellingen',
        '/over-wdt',
        '/geschiedenis',
      ]

      defaultRoutes.forEach((r: string) => {
        ctx.routes.add(r)
      })

      const fetchPagesByType = async (type: string) => {
        const PAGESIZE = 20
        let hasNextPage = true
        let page = 1
        const baseUrl = process.env.NUXT_PUBLIC_API_URL as string

        while (hasNextPage) {
          const apiUrl = `${baseUrl}wp-json/wp/v2/${type}/?_fields[]=link&per_page=${PAGESIZE}&page=${[
            page,
          ]}&status=publish`
          const response = await ofetch
            .raw(apiUrl)
            .catch(error => error.data)
          const totalPages = Number(response.headers.get('X-WP-TotalPages'))

          let suffix = '/'

          if (type === 'posts') {
            suffix = `/nieuws/`
          }

          const routes = response._data.map((r: { link: string }) => r.link.replace(baseUrl, suffix))

          const prerenderedRouters = routes.filter((r: string) => {
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
            return !excludeUrls.includes(r)
          })

          prerenderedRouters.forEach((r: string) => {
            ctx.routes.add(r)
          })

          if (page >= totalPages) {
            hasNextPage = false
          }

          page = page + 1
        }
      }
      await fetchPagesByType('posts')
      await fetchPagesByType('pages')
      await fetchPagesByType('shows')
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  fonts: {
    defaults: {

      subsets: [
        'latin-ext',
        'latin',
      ],
    },
    families: [{
      weights: [400, 700],
      styles: ['normal'],
      name: 'Sora',
      provider: 'google',
      global: true,
    },
    {
      weights: [500],
      styles: ['normal'],
      name: 'Domine',
      provider: 'google',
      global: true,
    },
    ],
  },
  i18n: {
    strategy: 'prefix_except_default',
    customRoutes: 'meta',
    experimental: {
      strictSeo: true,
    },
    defaultLocale: 'nl',
    baseUrl: 'https://www.wdttoneel.nl/',
    locales: [
      {
        name: 'Nederlands',
        code: 'nl',
        language: 'nl',
        file: 'nl.json',
      },
    ],
  },
  icon: {
    mode: 'svg',
  },
  image: {
    // provider: 'none',
    domains: ['wdt.local', 'test.wdttoneel.nl'],
  },
  stylelint: {
    lintOnStart: true,
  },
})
