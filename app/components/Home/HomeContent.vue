<script lang="ts" setup>
defineProps<{
  page: Page
}>()
</script>

<template>
  <div>
    <app-image
      v-if="page.image"
      :image="page.image"
      class="featured-image"
    />
    <center-wrapper
      class="home-content"
      size="md"
    >
      <div class="content">
        <h1>{{ page.title }}</h1>
        <div
          class="text"
          v-html="page.content"
        />
        <div class="btn-wrapper">
          <app-button
            :to="$localeRoute({
              name: 'page',
              params: {
                slug: 'over-wdt',
              },
            })"
            title="Lees verder"
          />
        </div>
      </div>
    </center-wrapper>
  </div>
</template>

<style lang="css" scoped>
.featured-image {
  width: 100%;
}

.content {
  padding-block: var(--section-block-padding);
  font-family: var(--font-family-heading);
}

.btn-wrapper {
  display: flex;
  justify-content: center;
}
</style>
