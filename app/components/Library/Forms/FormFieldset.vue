<script lang="ts" setup>
withDefaults(defineProps<{
  title: string
  colunns?: number
}>(), {
  colunns: 1,
})
</script>

<template>
  <fieldset>
    <legend>
      {{ title }}
    </legend>
    <slot />
  </fieldset>
</template>

<style lang="css" scoped>
fieldset {
  display: grid;
  grid-template-columns: repeat(v-bind(colunns), 1fr);
  gap: var(--gutter);
  padding: 0;
  margin: 0 0 var(--spacing-2);
  border: 0;
}

legend {
  display: block;
  grid-template-columns: span v-bind(colunns);
  padding: 0;
  margin-block-end: var(--spacing-2);
  font-family: var(--font-family-heading);
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-heading);
}
</style>
