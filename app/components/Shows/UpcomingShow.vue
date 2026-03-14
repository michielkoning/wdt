<script lang="ts" setup>
import AppButton from '../Shared/AppButton.vue'

const { data } = useFetch('/api/upcomingShow')
</script>

<template>
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
        v-if="data.image"
        :image="data.image"
      />
      <div>
        <h1>
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
        </h1>
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
</template>

<style lang="css" scoped>
.upcoming-show {
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: var(--spacing-4);
}
</style>
