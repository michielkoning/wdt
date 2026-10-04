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

const page = computed(() => route.query.page)

useSeoMeta({
  title: () => 'Voorstellingen',
  ogTitle: () => 'Voorstellingen',
})

const { data } = await useAsyncData(`search-${search}`, async () => {
  const url = getUrl({
    page: page.value as number | undefined,
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
}, {
  server: false,
  watch: [search, directors, authors, page],
})
</script>

<template>
  <center-wrapper>
    <block-wrapper>
      <h1>Voorstellingen</h1>
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
