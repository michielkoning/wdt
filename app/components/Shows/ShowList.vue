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
  grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
  gap: var(--spacing-4);
  padding-inline-start: 0;
  margin-block-end: var(--spacing-4);
  list-style: none outside;
}

a {
  text-decoration: none;
}

li {
  position: relative;

  &:hover,
  &:focus-within {
    a {
      text-decoration: underline;
    }
  }

  &::after {
    position: absolute;
    inset: auto 0 0;
    display: block;
    block-size: 2px;
    content: "";
    background-image: linear-gradient(to left, transparent, currentcolor, transparent);
  }
}

/* h2 {
  position: absolute;
  inset: auto 0 0;
  padding: var(--spacing-2);
  margin-bottom: 0;
  background-color: rgb(0 0 0 / 50%);
} */

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
