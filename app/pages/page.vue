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
  <theme-wrapper
    v-if="data"
    variant="dominant"
  >
    <center-wrapper size="md">
      <h1>{{ data.title }}</h1>
      <div v-html="data.content" />
    </center-wrapper>
  </theme-wrapper>
</template>
