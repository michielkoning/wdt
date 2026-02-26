<script lang="ts" setup>
definePageMeta({
  name: 'post',
  i18n: {
    paths: {
      nl: '/nieuws/[slug]',
    },
  },
})

const route = useRoute()

const { data } = useFetch('/api/post', {
  query: {
    slug: route.params.slug,
  },
})
</script>

<template>
  <div v-if="data">
    <center-wrapper>
      <h1>{{ data.title }}</h1>
      <div
        :exclude-id="data.id"
        v-html="data.content"
      />
    </center-wrapper>
    <post-list />
  </div>
</template>
