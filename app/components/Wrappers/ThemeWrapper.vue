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
  @mixin corners var(--spacing-6);

  margin-inline: var(--gutter);
  color: var(--text-on-dominant);
  background-color: var(--color-dominant);
}

.secondary {
  color: var(--text-on-secondary);
  background-color: var(--color-secondary);
}

.white {
  @mixin corners var(--spacing-4);

  padding: var(--spacing-8);
  color: var(--text-on-dominant);
  background-color: #fff;
}
</style>
