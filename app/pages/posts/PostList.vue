<script lang="ts" setup>
definePageMeta({
  name: 'posts',
  i18n: {
    paths: {
      nl: '/nieuws',
    },
  },
})

useSeoMeta({
  title: () => 'Nieuws',
  ogTitle: () => 'Nieuws',
})
</script>

<template>
  <post-list />
</template>
