<script setup lang="ts">
const { title } = useAppConfig()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${title}` : title
  },
})
</script>

<template>
  <div class="page">
    <nuxt-route-announcer />
    <nuxt-loading-indicator
      color="#a12b12"
    />
    <the-header />

    <main
      tabindex="-1"
    >
      <nuxt-page />
    </main>
    <the-footer />
  </div>
</template>

<style lang="css" scoped>
.page {
  display: flex;
  flex-direction: column;
  min-block-size: 100dvh;
  background: var(--color-bg);
}

main {
  flex: 1 0 auto;
}
</style>
