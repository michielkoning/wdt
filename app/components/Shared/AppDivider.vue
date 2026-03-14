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
  height: 2px;
  margin-block: var(--spacing-12);

  &::before {
    position: absolute;
    top: 0;
    right: 5%;
    left: 5%;
    width: 90%;
    height: 2px;
    content: "";
    background-image: linear-gradient(to right, transparent, var(--color-secondary), transparent);
  }
}

.arrow-down::after {
  position: absolute;
  top: -7px;
  left: calc(50% - 7px);
  z-index: 1;
  width: 14px;
  height: 14px;
  content: "";
  background-color: white;
  border-right: 2px solid var(--color-secondary);
  border-bottom: 2px solid var(--color-secondary);
  transform: rotate(45deg);
}

.tab-down::after {
  position: absolute;
  top: 0;
  left: calc(50% - 10px);
  z-index: 1;
  width: 20px;
  height: 14px;
  content: "";
  background-color: white;
  border-right: 2px solid var(--color-secondary);
  border-bottom: 2px solid var(--color-secondary);
  border-left: 2px solid var(--color-secondary);
  border-radius: 0 0 8px 8px;
}

.stopper::after {
  position: absolute;
  top: -6px;
  left: calc(50% - 7px);
  z-index: 1;
  width: 14px;
  height: 12px;
  content: "";
  background-color: white;
  border-right: 2px solid var(--color-secondary);
  border-left: 2px solid var(--color-secondary);
}

.dot::after {
  position: absolute;
  top: -9px;
  left: calc(50% - 9px);
  z-index: 1;
  width: 18px;
  height: 18px;
  content: "";
  background-color: goldenrod;
  border: 2px solid var(--color-secondary);
  border-radius: 50%;
  box-shadow:
    inset 0 0 0 2px white,
    0 0 0 4px white;
}
</style>
