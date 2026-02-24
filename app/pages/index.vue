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
    <center-wrapper
      v-if="data"
      size="md"
    >
      <h1>{{ data.title }}</h1>
      <div v-html="data.content" />
    </center-wrapper>
    <activity-list />
  </div>
</template>
