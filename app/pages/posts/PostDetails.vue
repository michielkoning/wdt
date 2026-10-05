<script lang="ts" setup>
import { CenterWrapper } from '@m11g/library'

definePageMeta({
  name: 'post',
  i18n: {
    paths: {
      nl: '/nieuws/[slug]',
    },
  },
})

const route = useRoute()

const { data } = await useFetch('/api/post', {
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
    <block-wrapper>
      <center-wrapper>
        <div class="content">
          <app-image
            v-if="data.image"
            :image="data.image"
            class="featured-image"
          />
          <div>
            <h1>{{ data.title }}</h1>
            <body-text :text="data.content" />
          </div>
        </div>
      </center-wrapper>
    </block-wrapper>
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

  @media (--md) {
    grid-template-columns: 1fr 2fr;
  }
}
</style>
