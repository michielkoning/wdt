<script lang="ts" setup>
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
    <block-wrapper>
      <center-wrapper>
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
      </center-wrapper>
    </block-wrapper>
  </clickable-wrapper>
</template>

<style lang="css" scoped>
.upcoming-show {
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: var(--spacing-4);
}
</style>
