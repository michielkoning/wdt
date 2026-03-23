<script lang="ts" setup>
defineProps<{
  text: string
}>()
</script>

<template>
  <div v-html="text" />
</template>

<style lang="css" scoped>
.text::first-letter {
  margin-right: 0.25em;
  initial-letter: 2;
  font-family: var(--font-family-heading);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-heading);
}
</style>
