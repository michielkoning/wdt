<script lang="ts" setup>
const props = defineProps<{
  banner?: Image
  image?: Image
}>()

const transitionName = computed(() => `image-${props.image?.id}`)
</script>

<template>
  <div class="card">
    <app-image
      v-if="banner"
      :image="banner"
      :loading="false"
      class="image-sm featured-image"
    />
    <app-image
      v-if="image"
      :loading="false"
      :image="image"
      class="image-md featured-image"
    />
  </div>
</template>

<style lang="css" scoped>
@import "~/assets/css/media-queries/media-queries.css";

.card {
  view-transition-name: v-bind(transitionName);
}

.image-sm {
  @media (--viewport-md) {
    display: none;
  }
}

.card:has(.image-sm) {
  .image-md {
    display: none;

    @media (--viewport-md) {
      display: block;
    }
  }
}
</style>
