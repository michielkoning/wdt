<script lang="ts" setup>
defineProps<{
  text: string
}>()
</script>

<template>
  <div class="notification">
    <icon name="solar:check-circle-bold" />
    {{ text }}
  </div>
</template>

<style lang="css" scoped>
.notification {
  display: flex;
  gap: var(--spacing-1);
  padding: var(--spacing-2);
  margin-block-end: var(--spacing-4);
  color: darkgreen;
  background-color: lightgreen;
  border-inline-start: 0.25em solid green;
}

svg {
  inline-size: 1.25em;
  block-size: 1.25em;
  margin-block-start: 0.1em;
}
</style>
