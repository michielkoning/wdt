<script lang="ts" setup>
defineProps<{
  banner?: Image
  image?: Image
}>()
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
.image-sm {
  @media (--md) {
    display: none;
  }
}

.card:has(.image-sm) {
  .image-md {
    display: none;

    @media (--md) {
      display: block;
    }
  }
}
</style>
