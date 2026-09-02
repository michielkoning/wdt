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

const { data } = useFetch('/api/page', {
  query: {
    slug: 'home',
  },
})
</script>

<template>
  <div>
    <!-- <upcoming-show /> -->
    <home-content
      v-if="data"
      :page="data"
    />
    <post-list variant="latest" />
  </div>
</template>
