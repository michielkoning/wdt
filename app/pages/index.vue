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
  <div v-if="data">
    <upcoming-show />
    <block-wrapper class="about">
      <h1>{{ data.title }}</h1>
      <div
        class="text"
        v-html="data.content"
      />
    </block-wrapper>
    <post-list variant="latest" />
  </div>
</template>
