<script lang="ts" setup>
import AppButton from './AppButton.vue'

const props = defineProps<{
  images: Image[]
  title: string
}>()

const totalImages = computed(() => props.images.length)
</script>

<template>
  <block-wrapper>
    <ul>
      <li
        v-for="image in images"
        :key="image.id"
      >
        <app-image
          :image="image"
          class="image"
        />
      </li>
    </ul>
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
ul {
  @mixin list-reset;

  display: grid;
  grid-template-columns: repeat(v-bind(totalImages), 1fr);
  gap: var(--spacing-2);
  padding-bottom: var(--spacing-1);
  margin-bottom: var(--spacing-2);
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scrollbar-color: var(--color-secondary) transparent;
  scrollbar-width: thin;
}

.btn-wrapper {
  display: flex;
  justify-content: center;
}

li {
  /* stylelint-disable-next-line declaration-property-value-no-unknown */
  width: min(65vw, 40em);
  scroll-snap-align: center;
}

.image {
  height: 100%;

  :deep(img) {
    height: 100%;
    object-fit: cover;
  }
}
</style>
