<script lang="ts" setup>
import AppButton from './AppButton.vue'

defineProps<{
  images: Image[]
  title: string
}>()
</script>

<template>
  <block-wrapper>
    <app-carousel :total="images.length">
      <li
        v-for="image in images"
        :key="image.id"
      >
        <app-image
          :image="image"
          class="image"
        />
      </li>
    </app-carousel>
    <div class="btn-wrapper">
      <app-button
        commandfor="gallery"
        command="show-modal"
        title="Bekijk alle foto's"
      />
    </div>
  </block-wrapper>
  <gallery-modal
    id="gallery"
    :title
    :images
  />
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
