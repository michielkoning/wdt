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
      type="search"
      v-bind="$attrs"
    >
    <icon
      name="solar:close-circle-bold"
      class="icon"
    />
  </div>
</template>

<style lang="css" scoped>
.field {
  position: relative;
}

.icon {
  position: absolute;
  top: 50%;
  right: var(--spacing-4);
}
</style>
