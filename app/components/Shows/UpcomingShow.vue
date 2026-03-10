<script lang="ts" setup>
const { data } = useFetch('/api/upcomingShow')
</script>

<template>
  <theme-wrapper variant="dominant">
    <center-wrapper>
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
          </div>
        </div>
      </clickable-wrapper>
    </center-wrapper>
  </theme-wrapper>
</template>

<style lang="css" scoped>
.upcoming-show {
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: var(--spacing-4);
}
</style>
