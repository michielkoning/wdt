<script lang="ts" setup>
withDefaults(
  defineProps<{
    size?: 'full' | 'md' | 'lg' | 'sm'
    top?: boolean
  }>(),
  {
    top: false,
    size: 'lg',
  },
)
</script>

<template>
  <div
    class="notch"
    :class="{ top }"
  >
    <div
      class="wrapper"
      :class="`wrapper-${size}`"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="css" scoped>
.notch {
  padding: 0 env(safe-area-inset-right) 0 env(safe-area-inset-left);

  &.top {
    padding-top: env(safe-area-inset-top);
  }
}

.wrapper-sm {
  --wrapper-size: var(--container-size-sm);
}

.wrapper-md {
  --wrapper-size: var(--container-size-md);
}

.wrapper-lg {
  --wrapper-size: var(--container-size-lg);
}

.wrapper {
  /* stylelint-disable-next-line length-zero-no-unit */
  --zero: 0px;

  padding-inline: var(--gutter);
  margin-inline: max(var(--zero), ((100% - var(--wrapper-size)) / 2));
}
</style>
