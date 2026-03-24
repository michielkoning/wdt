<script lang="ts" setup>
defineProps<{
  title: string
}>()
</script>

<template>
  <fieldset>
    <legend>
      {{ title }}
    </legend>
    <div class="fields">
      <slot />
    </div>
  </fieldset>
</template>

<style lang="css" scoped>
fieldset {
  min-inline-size: 0;
  padding: 0;
  margin: 0 0 var(--spacing-2);
  border: 0;

  --columns: 1;
}

fieldset + fieldset {
  padding-block-start: var(--spacing-2);
  border-block-start: 1px solid var(--color-gray);
}

.fields {
  display: grid;
  grid-template-columns: repeat(var(--columns, 1), 1fr);
  gap: var(--gutter);
}
</style>
