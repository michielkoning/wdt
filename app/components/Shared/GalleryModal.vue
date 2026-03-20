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
  padding: 0;
  margin-bottom: 0;
  list-style: none outside;
}

li {
  &:not(:last-child) {
    margin-bottom: var(--spacing-2);
  }
}
</style>
