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
    <nuxt-loading-indicator color="var(--color-accent)" />
    <slot />
    <the-header />

    <main
      id="content"
      class="main"
      tabindex="-1"
    >
      <nuxt-page />
    </main>
  </div>
</template>

<style lang="css" scoped>
  .page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .main {
    flex: 1 1 auto;
  }
</style>
