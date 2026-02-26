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
    <block-wrapper>
      <center-wrapper
        v-if="data"
        size="md"
      >
        <h1>{{ data.title }}</h1>
        <div v-html="data.content" />
      </center-wrapper>
    </block-wrapper>
    <post-list variant="latest" />
    <activity-list />
  </div>
</template>
