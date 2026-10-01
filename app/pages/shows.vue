<script lang="ts" setup>
import { AppPopover } from '@m11g/library'

import z from 'zod'

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
    directors: z.number().or(z.string()),
    authors: z.number().or(z.string()),
  })),
})

const [search] = defineField('search')
const [directors] = defineField('directors')
const [authors] = defineField('authors')

const { start, finish } = useLoadingIndicator()

const route = useRoute()

const page = computed(() => route.query.page)

const { data } = useFetch('/api/shows', {
  query: {
    search,
    directors,
    authors,
    page,
  },
  onRequest: start,
  onResponse: finish,
})

useSeoMeta({
  title: () => 'Voorstellingen',
  ogTitle: () => 'Voorstellingen',
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
        <app-popover :total-pages="data.totalPages" />
      </div>
    </block-wrapper>
  </center-wrapper>
</template>
