<script lang="ts" setup>
import {
  ClickableWrapper,
} from '@m11g/library'

defineProps<{
  shows: Shows
}>()

const id: Ref<number | undefined> = ref(undefined)

const add = async (value: number, url: string) => {
  id.value = value

  await navigateTo(url)
}
</script>

<template>
  <ul v-if="shows.length">
    <clickable-wrapper
      v-for="item in shows"
      :key="item.id"
      :class="{
        active: item.id === id,
      }"
      @clicked="add(item.id, $localePath({
        name: 'show',
        params: {
          slug: item.slug,
        },
      }))"
    >
      <image-card
        class="image-wrapper"
        :image="item.image"
      />

      <nuxt-link-locale
        :to="{
          name: 'show',
          params: {
            slug: item.slug,
          },
        }"
        @click="id = item.id"
      >
        {{ item.title }}
      </nuxt-link-locale>
    </clickable-wrapper>
  </ul>
</template>

<style lang="css" scoped>
ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
  gap: var(--spacing-4);
  padding-inline-start: 0;
  margin-block-end: var(--spacing-4);
  list-style: none outside;
}

a {
  font-family: var(--font-family-heading);
  font-weight: var(--font-weight-bold);
  text-decoration: none;
}

li {
  &:hover,
  &:focus-within {
    a {
      text-decoration: underline;
    }
  }
}

.image-wrapper {
  aspect-ratio: 3 / 4;
  margin-block-end: var(--spacing-2);

  &:deep(picture) {
    block-size: 100%;
  }

  &:deep(img) {
    block-size: 100%;
    object-fit: cover;
  }
}

.active .image-wrapper {
  view-transition-name: image;
  view-transition-class: image;
}
</style>
