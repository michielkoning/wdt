<script lang="ts" setup>
definePageMeta({
  name: 'post',
  i18n: {
    paths: {
      nl: '/nieuws/[slug]',
    },
  },
})

const route = useRoute()

const { data } = useFetch('/api/post', {
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
  <block-wrapper v-if="data">
    <h1>{{ data.title }}</h1>
    <div
      class="text"
      v-html="data.content"
    />
    <post-list
      :exclude-id="data.id"
    />
  </block-wrapper>
</template>

<style lang="css" scoped>
.text::first-letter {
  margin-right: 0.25em;
  initial-letter: 2;
  font-family: var(--font-family-heading);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-heading);
}
</style>
