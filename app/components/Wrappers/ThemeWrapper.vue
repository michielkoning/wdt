<script lang="ts" setup>
defineProps<{
  variant: 'dominant' | 'secondary' | 'white'
}>()
</script>

<template>
  <div>
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
  color: var(--color-white);
  background-color: var(--color-black);
}

.secondary {
  color: var(--color-white);
  background-color: var(--color-black);
}

.white {
  padding: var(--spacing-8);
  color: var(--color-white);
  background-color: #fff;
}
</style>
