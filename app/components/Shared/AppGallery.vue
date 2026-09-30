<script lang="ts" setup>
import { AppButton, AppCarousel } from '@m11g/library'

const props = defineProps<{
  images: Image[]
  title: string
}>()

const imageIds = computed(() => {
  return props.images.map(image => `${image.id}`)
})
</script>

<template>
  <block-wrapper>
    <app-carousel :items="imageIds">
      <template
        v-for="image in images"
        #[image.id]
        :key="image.id"
      >
        <app-image
          :image="image"
          class="image"
        />
      </template>
    </app-carousel>
    <div class="btn-wrapper">
      <app-button
        commandfor="gallery"
        command="show-modal"
        title="Bekijk alle foto's"
      />
    </div>
    <gallery-modal
      id="gallery"
      :title
      :images
    />
  </block-wrapper>
</template>

<style lang="css" scoped>
li {
  inline-size: min(65vw, 40em);
}

.image {
  block-size: 100%;

  :deep(img) {
    block-size: 100%;
    object-fit: cover;
  }
}

.btn-wrapper {
  display: flex;
  justify-content: center;
}
</style>
