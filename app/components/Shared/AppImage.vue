<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    image: Image
    sizes?: string
    lazy?: boolean
  }>(),
  {
    sizes: 'sm:300px sm:300px md:300px lg:300px xl:300px 2xl:300px"',
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
  <nuxt-picture
    :sizes="sizes"
    :alt="image.alt ? image.alt : ''"
    :loading="loading"
    :src="image.src"
    :preload="loading === 'eager'"
    :width="image.width"
    :quality="100"
    :height="image.height"
    format="avif,webp"
    class="image"
  />
</template>

<style lang="css" scoped>
picture {
  display: block;
}

.image :deep(img) {
  display: block;
  width: 100%;
  height: auto;
}
</style>
