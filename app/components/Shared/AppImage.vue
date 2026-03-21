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
    :placeholder="[image.width / 10, image.height / 10, 75, 5]"
  />
</template>

<style lang="css" scoped>
picture {
  display: block;
  background-color: var(--color-secondary-100);
}

.image :deep(img) {
  display: block;
  width: 100%;
  height: auto;
}
</style>
