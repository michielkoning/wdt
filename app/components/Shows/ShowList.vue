<script lang="ts" setup>
defineProps<{
  shows: Shows
}>()
</script>

<template>
  <ul v-if="shows.length">
    <clickable-wrapper
      v-for="item in shows"
      :key="item.id"
      :to="$localePath({
        name: 'show',
        params: {
          slug: item.slug,
        },
      })"
    >
      <image-card
        class="image-wrapper"
        :image="item.image"
      />

      <h3>
        <nuxt-link-locale
          :to="{
            name: 'show',
            params: {
              slug: item.slug,
            },
          }"
        >
          {{ item.title }}
        </nuxt-link-locale>
      </h3>
    </clickable-wrapper>
  </ul>
</template>

<style lang="css" scoped>
ul {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-4);
  padding-inline-start: 0;
  margin-block-end: var(--spacing-4);
  list-style: none outside;

  @media (--xs) {
    grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
  }
}

a {
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
</style>
