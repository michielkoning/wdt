<script lang="ts" setup>
import HomeContent from '~/components/Home/HomeContent.vue'

definePageMeta({
  name: 'home',
  i18n: {
    paths: {
      nl: '/',
    },
  },
})

const { data } = await useFetch('/api/page', {
  query: {
    slug: 'home',
  },
})
</script>

<template>
  <div v-if="data">
    <home-content
      :page="data"
    />
    <post-list variant="latest" />
    <!-- <upcoming-show /> -->
    <activity-list />
  </div>
</template>
