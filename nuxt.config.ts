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
    '~/components/Forms',
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
          content: 'black',
        },
        { name: 'apple-mobile-web-app-title', content: 'title' },
        { name: 'theme-color', content: '#ac4747' },
      ],
    },
  },

  css: ['~/assets/css/base.css'],
  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) =>
        ['search', 'selectedcontent'].includes(tag),
    },
  },
  runtimeConfig: {
    user: '',
    password: '',
    apiUrl: '',
  },
  experimental: {
    // inlineSSRStyles: false,
    viewTransition: true,
    renderJsonPayloads: true,
  },
  compatibilityDate: '2025-07-15',
  nitro: {
    routeRules: {
      '/**': {
        isr: 60 * 60,
      },
      '/api': {
        isr: false,
      },
    },
    preset: 'netlify',
    prerender: {
      interval: 3000,
      concurrency: 5,
    },
    devStorage: {
      cache: {
        driver: 'null',
        base: './.nuxt/cache',
      },
    },
    storage: {
      cache: {
        // driver: 'null',
        driver: 'netlify-blobs',
        name: 'cache',
      },
    },

  },
  typescript: {
    typeCheck: true,
  },

  postcss: {
    plugins: {
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
      styles: ['normal', 'italic'],
      name: 'Bitter',
      provider: 'google',
      global: true,
    },
    {
      weights: [500],
      styles: ['normal'],
      name: 'Cinzel',
      provider: 'google',
      global: true,
    },
    {
      weights: [400],
      styles: ['normal'],
      name: 'Limelight',
      provider: 'google',
      global: true,
    }],

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
    domains: ['wdt.local', 'test.wdttoneel.nl'],
  },
  stylelint: {
    lintOnStart: true,
  },
})
