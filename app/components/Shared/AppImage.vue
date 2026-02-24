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
  <div
    :id="`image-${image.id}`"
    class="image"
  >
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
    />
  </div>
</template>

<style lang="css" scoped>
.image :deep(img) {
  display: block;
  width: 100%;
  height: auto;
}

.image[id] {
  view-transition-name: attr(id type(<custom-ident>), none); /* card-1, card-2, card-3, … */
  view-transition-class: image;
}
</style>
