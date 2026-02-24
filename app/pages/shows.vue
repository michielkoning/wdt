<script lang="ts" setup>
definePageMeta({
  name: 'shows',
  i18n: {
    paths: {
      nl: '/voorstellingen',
    },
  },
})

const search = ref('')
const directors: Ref<number[]> = ref([])
const authors: Ref<number[]> = ref([])

const { data } = useFetch('/api/shows', {
  query: {
    search,
    directors,
    authors,
  },
})
</script>

<template>
  <center-wrapper>
    <shows-filter
      v-model:authors="authors"
      v-model:directors="directors"
      v-model:search="search"
    />
    <div v-if="data">
      <show-list
        v-if="data.length"
        :shows="data"
      />
    </div>
  </center-wrapper>
</template>
