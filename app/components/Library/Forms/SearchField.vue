<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
})

const model = defineModel<string>({
  required: true,
})
</script>

<template>
  <div class="field">
    <input
      v-model="model"
      placeholder="Zoeken naar voorstellingen"
      name="search"
      type="search"
      v-bind="$attrs"
    >
    <icon
      name="solar:minimalistic-magnifer-outline"
      class="icon"
    />
  </div>
</template>

<style lang="css" scoped>
.field {
  position: relative;
}

input {
  padding-inline-end: 3rem;
}

.icon {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-end: var(--spacing-4);
  inline-size: 1.5rem;
  block-size: auto;
  aspect-ratio: 1;
  translate: 0 -0.75rem;
}
</style>
