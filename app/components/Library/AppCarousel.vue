<script lang="ts" setup>
defineProps<{
  total: number
}>()
</script>

<template>
  <div class="wrapper">
    <ul>
      <slot />
    </ul>
  </div>
</template>

<style lang="css" scoped>
.wrapper {
  position: relative;
}

ul {
  @mixin list-reset;

  display: grid;
  grid-template-columns: repeat(v-bind(total), 1fr);
  gap: var(--spacing-2);
  margin-block-end: var(--spacing-4);
  overflow-x: scroll;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-color: var(--color-black) transparent;
  scrollbar-width: thin;
  scroll-marker-group: after;

  @supports (scroll-marker-group: after) {
    margin-block-end: var(--spacing-2);
  }

  &::scroll-button(left),
  &::scroll-button(right) {
    position: absolute;
    inset-block-start: 50%;
    inline-size: 2em;
    aspect-ratio: 0.571;
    margin-block-start: calc(var(--spacing-8) * -1);
    cursor: pointer;
    content: "";
    background-color: var(--color-black);
    border-shape:
      shape(
        from 96.34% 44.96%,
        curve by 0% 10.11% with 4.88% 2.79%/4.88% 7.32%,
        line by -74.99% 42.84%,
        curve by -17.69% 0% with -4.88% 2.79%/-12.81% 2.79%,
        smooth by 0% -10.11% with -4.88% -7.32%,
        line to 69.82% 50%,
        line to 3.7% 12.2%,
        curve by 0% -10.11% with -4.88% -2.79%/-4.88% -7.32%,
        smooth by 17.69% 0% with 12.81% -2.79%,
        line by 74.99% 42.84%,
        close
      );
    border: 1px solid var(--color-white);
    transition: opacity var(--transition);

    &:disabled {
      opacity: 0;
    }
  }

  &::scroll-button(left) {
    inset-inline-start: 1em;
    rotate: 180deg;
  }

  &::scroll-button(right) {
    inset-inline-end: 1em;
  }

  &::scroll-marker-group {
    display: flex;
    gap: var(--spacing-1);
    place-content: center;
    margin-block-end: var(--spacing-6);
  }
}

:deep(li) {
  scroll-snap-align: center;

  &::scroll-marker {
    display: block;
    inline-size: 0.5em;
    block-size: 0.5em;
    aspect-ratio: 1;
    content: "";
    background-color: var(--color-white);
    border: 2px solid var(--color-black);
    border-radius: 50%;

    &:hover,
    &::scroll-marker:target-current {
      background-color: green;
    }
  }
}
</style>
