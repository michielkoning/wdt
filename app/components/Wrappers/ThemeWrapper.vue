<script lang="ts" setup>
defineProps<{
  variant: 'dominant' | 'secondary' | 'white'
}>()
</script>

<template>
  <div
    class="theme-wrapper"
    :class="variant"
  >
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style lang="css" scoped>
.theme-wrapper {
  padding-block: var(--spacing-8) var(--spacing-6);
}

.dominant {
  margin-inline: var(--gutter);
  color: var(--text-on-dominant);
  background-color: var(--color-dominant);
  border-radius: var(--spacing-4);
}

.secondary {
  color: var(--text-on-secondary);
  background-color: var(--color-secondary);
}

.white {
  padding: var(--spacing-4);
  color: var(--text-on-dominant);
  background-color: #fff;
  border-radius: var(--spacing-4);
}
</style>
