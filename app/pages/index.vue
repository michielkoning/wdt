<script lang="ts" setup>
import AppDivider from '~/components/Shared/AppDivider.vue'

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
    <center-wrapper
      v-if="data"
      size="lg"
    >
      <upcoming-show />
      <app-divider variant="stopper" />
      <div class="about">
        <h1>{{ data.title }}</h1>
        <div
          class="text"
          v-html="data.content"
        />
      </div>
      <app-divider variant="arrow-down" />
      <post-list variant="latest" />
    </center-wrapper>
  </div>
</template>

<style lang="css" scoped>
h1 {
  text-align: center;
}

.text {
  text-align: justify;
}
</style>
