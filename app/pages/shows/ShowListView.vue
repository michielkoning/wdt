<script lang="ts" setup>
import { AppPagination, CenterWrapper } from '@m11g/library'

import z from 'zod'
import { ShowsSchema } from '~~/server/schemas/ShowsSchema'

definePageMeta({
  name: 'shows',
  i18n: {
    paths: {
      nl: '/voorstellingen',
    },
  },
})

const { defineField } = useForm({
  name: 'filters',
  validationSchema: toTypedSchema(z.object({
    search: z.string(),
    directors: z.number(),
    authors: z.number(),
  })),
  initialValues: {
    search: '',
    directors: 0,
    authors: 0,
  },
})

const [search] = defineField('search')
const [directors] = defineField('directors')
const [authors] = defineField('authors')

const route = useRoute()

const title = useTemplateRef('title')

const page = computed(() => route.query.page ? Number(route.query.page) : 1)

useSeoMeta({
  title: () => 'Voorstellingen',
  ogTitle: () => 'Voorstellingen',
})
const { start, finish } = useLoadingIndicator()

const keys = computed(() => {
  return `search:${search.value}_page:${page.value}directors:${directors.value}_authors:${authors.value}`
})

const { data, execute } = await useAsyncData(keys, async () => {
  const url = getUrl({
    page: page.value as number,
    search: search.value,
    directors: directors.value ? [directors.value] as number[] : undefined,
    authors: authors.value ? [authors.value] as number[] : undefined,
    pageSize: 12,
    image: true,
    type: 'shows',
    parent: 0,
    fields: ['title', 'slug', 'excerpt', 'acf'],
  })

  const response = await $fetch.raw(url)

  return parseData({
    items: response._data,
    totalPages: response.headers.get('X-WP-TotalPages'),
  }, ShowsSchema)
})

watch([search, directors, authors], async () => {
  if (page.value > 1) {
    await navigateTo({
      query: {
        page: 1,
      },

    }, {
      replace: true,
    })
  }
  start()
  await execute()
  finish()
})

watch(page, async () => {
  start()
  await execute()
  if (import.meta.client && title.value) {
    title.value.scrollIntoView()
  }
  finish()
})
</script>

<template>
  <center-wrapper>
    <block-wrapper>
      <h1 ref="title">
        Voorstellingen
      </h1>
      <shows-filter />
      <div v-if="data">
        <show-list
          v-if="data.items.length"
          :shows="data.items"
        />
        <app-pagination :total-pages="data.totalPages" />
      </div>
    </block-wrapper>
  </center-wrapper>
</template>
