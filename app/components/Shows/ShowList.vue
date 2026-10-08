<script lang="ts" setup>
defineProps<{
  shows: ShowListItem[]
}>()
</script>

<template>
  <ul v-if="shows.length">
    <show-list-item
      v-for="show in shows"
      :key="show.id"
      :show
    />
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
</style>
