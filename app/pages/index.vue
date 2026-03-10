<script lang="ts" setup>
definePageMeta({
  name: 'home',
  i18n: {
    paths: {
      nl: '/',
    },
  },
})

const { data } = useFetch('/api/page', {
  query: {
    slug: 'home',
  },
})
</script>

<template>
  <div>
    <upcoming-show />
    <theme-wrapper variant="secondary">
      <center-wrapper
        v-if="data"
        size="md"
      >
        <h1>{{ data.title }}</h1>
        <div v-html="data.content" />
      </center-wrapper>
    </theme-wrapper>
    <post-list variant="latest" />
  </div>
</template>
