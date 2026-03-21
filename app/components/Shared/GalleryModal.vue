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
        />
      </li>
    </ul>
  </app-modal>
</template>

<style lang="css" scoped>
ul {
  height: 90vh;
  padding: 0;
  margin-bottom: 0;
  overflow-y: scroll;
  list-style: none outside;
  scroll-snap-type: y mandatory;
}

li {
  scroll-snap-align: start;

  &:not(:last-child) {
    margin-bottom: var(--spacing-2);
  }
}
</style>
