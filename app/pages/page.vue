<script lang="ts" setup>
import { CenterWrapper } from '@m11g/library'

definePageMeta({
  name: 'page',
  i18n: {
    paths: {
      nl: '/[slug]',
    },
  },
})

const route = useRoute()

const { data } = useFetch('/api/page', {
  query: {
    slug: route.params.slug,
  },
})

useSeoMeta({
  title: () => data.value?.title,
  ogTitle: () => data.value?.title,
})
</script>

<template>
  <div class="page">
    <center-wrapper
      v-if="data"
    >
      <h1>
        {{ data.title }}
      </h1>
      <body-text :text="data.content" />
      <app-pages :parent-id="data.id" />
    </center-wrapper>
  </div>
</template>

<style lang="css" scoped>
.page {
  padding-block: var(--spacing-8);
}
</style>
