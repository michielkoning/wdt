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
  min-width: 0;
  padding: 0;
  margin: 0 0 var(--spacing-m);
  border: 0;
}

fieldset + fieldset {
  padding-top: var(--spacing-m);
  border-top: 1px solid var(--color-gray);
}

.fields {
  display: grid;
  grid-template-columns: repeat(var(--columns, 1), 1fr);
  gap: var(--gutter);
}
</style>
