<script lang="ts" setup>
defineProps<{
  title: string
  open?: boolean
  name?: string
}>()
</script>

<template>
  <details
    :open
    :name
  >
    <summary>{{ title }}</summary>
    <slot />
  </details>
</template>

<style lang="css" scoped>
details {
  cursor: pointer;
  border-block-end: 2px solid var(--color-black);

  &:first-of-type {
    border-block-start: 2px solid var(--color-black);
  }

  &::details-content {
    block-size: 0;
    overflow: clip;
    border-block-start: 1px solid var(--color-black);
    opacity: 0;
    transition:
      padding var(--transition),
      opacity var(--transition),
      height var(--transition),
      content-visibility var(--transition) allow-discrete;
  }

  &[open]::details-content {
    block-size: auto;
    padding-block: var(--spacing-2) var(--spacing-4);
    opacity: 1;
  }
}

summary {
  padding-block: var(--spacing-2);

  /* display: flex; */
}

::marker {
  inline-size: 2em;
  block-size: 1em;
  aspect-ratio: 1;
  content: "";
  background-color: var(--color-black);

  /* border-shape:
    shape(
      from 96.34% 44.96%,
      curve by 0% 10.11% with 4.88% 2.79% / 4.88% 7.32%,
      line by -74.99% 42.84%,
      curve by -17.69% 0% with -4.88% 2.79% / -12.81% 2.79%,
      smooth by 0% -10.11% with -4.88% -7.32%,
      line to 69.82% 50%,
      line to 3.7% 12.2%,
      curve by 0% -10.11% with -4.88% -2.79%/-4.88% -7.32%,
      smooth by 17.69% 0% with 12.81% -2.79%,
      line by 74.99% 42.84%,
      close
    ); */
}
</style>
