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
  padding-right: 3rem;
}

.icon {
  position: absolute;
  top: 50%;
  right: var(--spacing-4);
  width: 1.5rem;
  height: auto;
  aspect-ratio: 1;
  translate: 0 -0.75rem;
}
</style>
