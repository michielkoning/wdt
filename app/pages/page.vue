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
</script>

<template>
  <div v-if="data">
    <center-wrapper>
      <h1>{{ data.title }}</h1>
      <div v-html="data.content" />
    </center-wrapper>
  </div>
</template>
