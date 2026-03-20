<script lang="ts" setup>
import AppButton from '../Shared/AppButton.vue'

const { data } = useFetch('/api/upcomingShow')
</script>

<template>
  <block-wrapper>
    <h1>Volgende voorstelling</h1>
    <clickable-wrapper
      v-if="data"
      tag="div"
      :to="$localePath({
        name: 'show',
        params: {
          slug: data.slug,
        },
      })"
    >
      <div class="upcoming-show">
        <app-image
          v-if="data.banner"
          :image="data.banner"
          class="image-sm featured-image"
        />
        <app-image
          v-if="data.image"
          :image="data.image"
          class="image-md featured-image"
        />
        <div>
          <h2>
            <nuxt-link-locale
              :to="{
                name: 'show',
                params: {
                  slug: data.slug,
                },
              }"
            >
              {{ data.title }}
            </nuxt-link-locale>
          </h2>
          <div v-html="data.excerpt" />
          <app-button
            :to="$localeRoute({
              name: 'show',
              params: {
                slug: data.slug,
              },
            })"
            title="Lees verder"
          />
        </div>
      </div>
    </clickable-wrapper>
  </block-wrapper>
</template>

<style lang="css" scoped>
@import "~/assets/css/media-queries/media-queries.css";

.upcoming-show {
  display: grid;
  gap: var(--spacing-4);

  @media (--viewport-md) {
    grid-template-columns: 1fr 2fr;
  }
}

.image-sm {
  @media (--viewport-md) {
    display: none;
  }
}

.image-md {
  display: none;

  @media (--viewport-md) {
    display: block;
  }
}

a {
  text-decoration: none;
}
</style>
