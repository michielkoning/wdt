<script lang="ts" setup>
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
  <block-wrapper
    v-if="data"
  >
    <div>
      <h1>
        {{ data.title }}
      </h1>
      <body-text :text="data.content" />
      <app-pages :parent-id="data.id" />
    </div>
  </block-wrapper>
</template>
