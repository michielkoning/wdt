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
  <div v-if="data">
    <center-wrapper>
      <h1>{{ data.title }}</h1>
      <div class="content">
        <app-image
          v-if="data.image"
          :image="data.image"
          class="featured-image"
        />
        <body-text :text="data.content" />
      </div>
    </center-wrapper>
    <post-list
      :exclude-id="data.id"
    />
  </div>
</template>

<style lang="css" scoped>
.content {
  display: grid;
  gap: var(--spacing-4);
  align-items: start;
  margin-block-end: var(--spacing-8);

  @media (--md) {
    grid-template-columns: 1fr 2fr;
  }
}
</style>
