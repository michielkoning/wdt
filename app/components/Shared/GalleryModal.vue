<script lang="ts" setup>
defineProps<{
  images: Image[]
  id: string
}>()
</script>

<template>
  <app-modal
    :id="id"
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
  list-style: none outside;
}

li {
  margin: 0 0 var(--spacing-4);
}
</style>
