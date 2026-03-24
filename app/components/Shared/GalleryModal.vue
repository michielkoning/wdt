<script lang="ts" setup>
defineProps<{
  images: Image[]
  id: string
  title: string
}>()
</script>

<template>
  <app-modal
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
          :lazy="false"
        />
      </li>
    </ul>
  </app-modal>
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
  scroll-snap-align: start;

  &:not(:last-child) {
    margin-block-end: var(--spacing-2);
  }
}
</style>
