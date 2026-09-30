<script lang="ts" setup>
defineProps<{
  text: string
}>()
</script>

<template>
  <div
    v-html="text"
  />
</template>
