<script lang="ts" setup>
defineProps<{
  errorMessage?: string
}>()
</script>

<template>
  <span
    aria-live="assertive"
    class="error-message"
  >
    {{ errorMessage }}
  </span>
</template>

<style lang="css" scoped>
.error-message {
  display: block;
}
</style>
