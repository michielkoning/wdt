<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    image: Image
    sizes?: string
    lazy?: boolean
  }>(),
  {
    sizes: '100vw"',
    lazy: true,
  },
)
const loading = computed(() => {
  if (props.lazy) {
    return 'lazy'
  }
  return 'eager'
})
</script>

<template>
  <img
    :srcset="image.srcset"
    :alt="image.alt ? image.alt : ''"
    :loading="loading ? 'lazy' : undefined"
    :src="image.src"
    :width="image.width"
    :height="image.height"
    :fetchpriority="!loading ? 'high' : undefined"
  >
</template>

<style lang="css" scoped>
img {
  display: block;
}
</style>
