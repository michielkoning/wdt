<script lang="ts" setup>
import { AppButton, CenterWrapper } from '@m11g/library'

defineProps<{
  page: Page
}>()
</script>

<template>
  <div>
    <div class="hero">
      <app-image
        v-if="page.image"
        :image="page.image"
        class="featured-image"
      />
    </div>
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
.hero {
  background: var(--color-landmark-bg);
}

.featured-image {
  inline-size: 100%;
  max-inline-size: var(--container-size-xlg);
  margin-inline: auto;
}

.content {
  --font-size-lg: calc(var(--font-size-scale-base) * pow(var(--font-size-scale-ratio), 1.1));

  padding-block: var(--spacing-8);
  font-family: var(--font-family-heading);
  font-size: var(--font-size-lg);
}

.btn-wrapper {
  display: flex;
  justify-content: center;
}
</style>
