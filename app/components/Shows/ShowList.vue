<script lang="ts" setup>
defineProps<{
  shows: Shows
}>()
</script>

<template>
  <ul v-if="shows.length">
    <li
      v-for="item in shows"
      :key="item.id"
    >
      <app-image
        v-if="item.image"
        class="image"
        :image="item.image"
      />

      <h2>
        <nuxt-link-locale
          :to="{
            name: 'show',
            params: {
              slug: item.slug,
            },
          }"
        >
          <span v-html="item.title" />
        </nuxt-link-locale>
      </h2>
    </li>
  </ul>
</template>

<style lang="css" scoped>
ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14em, 1fr));
  gap: var(--spacing-4);
  padding-inline-start: 0;
  margin-bottom: var(--spacing-4);
  list-style: none outside;
}

li {
  position: relative;
  aspect-ratio: 3 / 4;
}

h2 {
  position: absolute;
  inset: auto 0 0;
  padding: var(--spacing-2);
  margin-bottom: 0;
  background-color: rgb(0 0 0 / 50%);
}

a {
  text-decoration: none;
}

.image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
