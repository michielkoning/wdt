<script lang="ts" setup>
import AppButton from '../Shared/AppButton.vue'
import ImageCard from '../Shared/ImageCard.vue'

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
        <image-card
          v-if="data.image"
          :image="data.image"
          :banner="data.banner"
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

a {
  text-decoration: none;
}
</style>
