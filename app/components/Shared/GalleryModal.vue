<script lang="ts" setup>
import { AppDialog } from '@m11g/library'

defineProps<{
  images: Image[]
  id: string
  title: string
}>()
</script>

<template>
  <app-dialog
    :id="id"
    :title="`Foto's van ${title}`"
  >
    <ul>
      <li
        v-for="image in images"
        :key="image.id"
      >
        <app-image
          :id="`image-${image.id}`"
          :image="image"
          class="image"
          :lazy="false"
        />
      </li>
    </ul>
  </app-dialog>
</template>

<style lang="css" scoped>
ul {
  block-size: 90vh;
  padding: 0;
  margin-block-end: 0;
  overflow-y: scroll;
  list-style: none outside;
  scroll-snap-type: y mandatory;
}

li {
  container-type: scroll-state;
  scroll-snap-align: center;

  &:not(:last-child) {
    margin-block-end: var(--spacing-4);
  }
}

.image {
  @supports (container-type: scroll-state) {
    opacity: 0.75;
    scale: 0.95;
    transition: scale var(--transition), opacity var(--transition);
  }

  @container scroll-state(snapped: y) {
    opacity: 1;
    scale: 1;
  }
}
</style>
