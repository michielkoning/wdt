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
  padding-block-end: var(--spacing-1);
  margin-block-end: var(--spacing-2);
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scrollbar-color: var(--color-secondary) transparent;
  scrollbar-width: thin;
  scroll-marker-group: after;

  /* stylelint-disable-next-line selector-type-no-unknown */
  &::scroll-button(*) {
    &:disabled {
      color: green;
    }
  }

  /* stylelint-disable-next-line selector-type-no-unknown */
  &::scroll-button(right) {
    content: "⬅" / "Scroll right";
  }
  /* stylelint-disable-next-line selector-type-no-unknown */
  &::scroll-button(left) {
    content: "---" / "Scroll left";
  }
}

.btn-wrapper {
  display: flex;
  justify-content: center;
}

li {
  /* stylelint-disable-next-line declaration-property-value-no-unknown */
  inline-size: min(65vw, 40em);
  scroll-snap-align: center;

  &::scroll-marker {
    width: 10px;
    height: 10px;
    content: "";
    background-color: green;
    border-radius: 50%;

    /* stylelint-disable-next-line selector-pseudo-class-no-unknown */
    &:target-current {
      background: #7c3aed;
      transform: scale(1.2);
    }
  }
}

.image {
  block-size: 100%;

  :deep(img) {
    block-size: 100%;
    object-fit: cover;
  }
}
</style>
