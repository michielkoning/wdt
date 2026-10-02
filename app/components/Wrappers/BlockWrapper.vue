<template>
  <div class="block-wrapper">
    <slot />
  </div>
</template>

<style lang="css" scoped>
.block-wrapper {
  padding-block: var(--spacing-8);

  @media (--md) {
    padding-block: var(--spacing-12);
  }
}
</style>
