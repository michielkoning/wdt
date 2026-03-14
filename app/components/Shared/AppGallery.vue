<script lang="ts" setup>
defineProps<{
  images: Image[]
}>()
</script>

<template>
  <block-wrapper>
    <ul>
      <li
        v-for="image in images"
        :key="image.id"
      >
        <button
          commandfor="gallery"
          command="show-modal"
          type="button"
        >
          <app-image :image="image" />
        </button>
      </li>
    </ul>

    <gallery-modal
      id="gallery"
      :images="images"
    />
  </block-wrapper>
</template>

<style lang="css" scoped>
ul {
  @mixin list-reset;

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--spacing-2);
}

img {
  display: block;
  width: 100%;
  height: 100%;
}

li {
  margin: 0;

  &:nth-child(8n + 1),
  &:nth-child(8n + 5) {
    grid-row: span 2;
    grid-column: span 4;
  }

  &:nth-child(8n + 2),
  &:nth-child(8n + 3),
  &:nth-child(8n + 4),
  &:nth-child(8n + 6) {
    grid-column: span 2;
  }

  &:nth-child(8n + 7),
  &:nth-child(8n + 8) {
    grid-column: span 3;
  }
}

button {
  display: block;
  width: 100%;
  height: 100%;
}

.image :deep(img) {
  display: block;
  width: 100%;
  height: auto;
}
</style>
