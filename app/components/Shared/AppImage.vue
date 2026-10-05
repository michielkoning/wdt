<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    image: Image
    sizes?: string
    lazy?: boolean
  }>(),
  {
    sizes: 'sm:100vw sm:100vw md:100vw lg:100vw xl:100vw 2xl:100vw"',
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
    format="avif,webp"
  >
</template>
