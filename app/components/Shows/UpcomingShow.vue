<script lang="ts" setup>
import { AppButton, ClickableWrapper } from '@m11g/library'

const { data } = await useFetch('/api/upcomingShow')
</script>

<template>
  <center-wrapper>
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
  </center-wrapper>
</template>

<style lang="css" scoped>
.upcoming-show {
  display: grid;
  gap: var(--spacing-4);

  @media (--md) {
    grid-template-columns: 1fr 2fr;
  }
}

a {
  text-decoration: none;
}
</style>
