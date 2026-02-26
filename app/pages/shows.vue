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

const route = useRoute()

const page = computed(() => route.query.page)

const { data } = useFetch('/api/shows', {
  query: {
    search,
    directors,
    authors,
    page,
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
        v-if="data.items.length"
        :shows="data.items"
      />
      <app-pagination :total-pages="data.totalPages" />
    </div>
  </center-wrapper>
</template>
