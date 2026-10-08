<script lang="ts" setup>
import { ClickableWrapper } from '@m11g/library'

const props = defineProps<{
  show: ShowListItem
}>()

const imageViewTransitioName = computed(() => {
  if (props.show.image) {
    return `image-${props.show.image.id}`
  }
  return 'none'
})
</script>

<template>
  <clickable-wrapper
    :to="$localePath({
      name: 'show',
      params: {
        slug: show.slug,
      },
    })"
  >
    <image-card
      class="image-wrapper"
      :image="show.image"
    />

    <nuxt-link-locale
      :to="{
        name: 'show',
        params: {
          slug: show.slug,
        },
      }"
    >
      {{ show.title }}
    </nuxt-link-locale>
  </clickable-wrapper>
</template>

<style lang="css" scoped>
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
  view-transition-name: v-bind(imageViewTransitioName);
  view-transition-class: image;

  &:deep(picture) {
    block-size: 100%;
  }

  &:deep(img) {
    block-size: 100%;
    object-fit: cover;
  }
}
</style>
