<script lang="ts" setup>
definePageMeta({
  name: 'home',
  i18n: {
    paths: {
      nl: '/',
    },
  },
})

const { data } = useFetch('/api/page', {
  query: {
    slug: 'home',
  },
})
</script>

<template>
  <div v-if="data">
    <upcoming-show />
    <block-wrapper class="about">
      <h1>Over WDT</h1>
      <div
        class="text"
        v-html="data.content"
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
    </block-wrapper>
    <post-list variant="latest" />
  </div>
</template>

<style lang="css" scoped>
.btn-wrapper {
  display: flex;
  justify-content: center;
}
</style>
