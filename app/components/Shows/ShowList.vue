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
      <div class="image-wrapper">
        <app-image
          v-if="item.image"
          class="image"
          :image="item.image"
        />
      </div>

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
  margin-bottom: var(--spacing-4);
  list-style: none outside;
}

a {
  text-decoration: none;
}

li {
  position: relative;
  border-bottom: 3px solid var(--color-secondary);

  &:hover,
  &:focus-within {
    a {
      text-decoration: underline;
    }
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
  margin-bottom: var(--spacing-2);
  border: 3px solid var(--color-secondary);

  &:deep(img) {
    height: 100%;
    object-fit: cover;
  }
}

.image {
  height: 100%;

  &:deep(img) {
    height: 100%;
    object-fit: cover;
  }
}
</style>
