<script lang="ts" setup>
defineProps<{
  id: string
  title: string
  name: string
  errorMessage?: string
}>()
</script>

<template>
  <div>
    <label
      :for="id"
      class="label"
    >
      {{ title }}
    </label>
    <slot />
    <form-error-message
      :error-message="errorMessage"
      class="error-message"
    />
  </div>
</template>

<style lang="css" scoped>
.label {
  display: block;
  margin-bottom: var(--spacing-xxs);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
}

.error-message {
  margin-top: var(--spacing-xxs);
}
</style>
