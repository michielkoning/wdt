<script lang="ts" setup>
defineProps<
  {
    variant?: 'stopper' | 'arrow-down' | 'tab-down' | 'dot'
  }
>()
</script>

<template>
  <div
    class="divider"
    :class="variant"
  />
</template>

<style lang="css" scoped>
.divider {
  position: relative;
  block-size: 2px;
  margin-block: var(--spacing-12);

  &::before {
    position: absolute;
    inset-block-start: 0;
    inset-inline: 5%;
    inline-size: 90%;
    block-size: 2px;
    content: "";
    background-image: linear-gradient(to right, transparent, currentcolor, transparent);
  }
}

.arrow-down::after {
  position: absolute;
  inset-block-start: -7px;
  inset-inline-start: calc(50% - 7px);
  z-index: 1;
  inline-size: 14px;
  block-size: 14px;
  content: "";
  background-color: white;
  border-block-end: 2px solid currentcolor;
  border-inline-end: 2px solid currentcolor;
  transform: rotate(45deg);
}

.tab-down::after {
  position: absolute;
  inset-block-start: 0;
  inset-inline-start: calc(50% - 10px);
  z-index: 1;
  inline-size: 20px;
  block-size: 14px;
  content: "";
  background-color: white;
  border-block-end: 2px solid currentcolor;
  border-inline-start: 2px solid currentcolor;
  border-inline-end: 2px solid currentcolor;
  border-radius: 0 0 8px 8px;
}

.stopper::after {
  position: absolute;
  inset-block-start: -6px;
  inset-inline-start: calc(50% - 7px);
  z-index: 1;
  inline-size: 14px;
  block-size: 12px;
  content: "";
  background-color: white;
  border-inline-start: 2px solid currentcolor;
  border-inline-end: 2px solid currentcolor;
}

.dot::after {
  position: absolute;
  inset-block-start: -9px;
  inset-inline-start: calc(50% - 9px);
  z-index: 1;
  inline-size: 18px;
  block-size: 18px;
  content: "";
  background-color: var(--color-secondary);
  border: 2px solid currentcolor;
  border-radius: 50%;
  box-shadow:
    inset 0 0 0 2px white,
    0 0 0 4px white;
}
</style>
