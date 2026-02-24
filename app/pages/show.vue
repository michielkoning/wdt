<script lang="ts" setup>
definePageMeta({
  name: 'show',
  i18n: {
    paths: {
      nl: '/voorstellingen/[slug]',
    },
  },
})

const route = useRoute()

const { data } = useFetch('/api/show', {
  query: {
    slug: route.params.slug,
  },
})

const directors = computed(() => {
  if (!data.value) {
    return []
  }
  return data.value.directors.map(item => item.name)
})

const authors = computed(() => {
  if (!data.value) {
    return []
  }
  return data.value.authors.map(item => item.name)
})

useSeoMeta({
  title: () => data.value?.title,
  ogTitle: () => data.value?.title,
})
</script>

<template>
  <div
    v-if="data"
    class="test"
  >
    <center-wrapper>
      <div
        class="show"
      >
        <div class="meta-data">
          <app-image
            v-if="data.image"
            :image="data.image"
          />
          <dl>
            <template v-if="directors.length">
              <dt>{{ $t('director', directors.length) }}</dt>
              <dd>{{ directors.join(', ') }}</dd>
            </template>

            <template v-if="authors.length">
              <dt>{{ $t('authors', authors.length) }}</dt>
              <dd>{{ authors.join(', ') }}</dd>
            </template>
          </dl>
        </div>
        <div class="content">
          <h1 v-html="data.title" />
          <div
            class="text"
            v-html="data.content"
          />
        </div>
      </div>
    </center-wrapper>
    <show-dates
      v-if="data.dates.length"
      :dates="data.dates"
    />
    <app-gallery
      v-if="data.gallery.length"
      :images="data.gallery"
    />
    <show-comments
      v-if="data.comments.length"
      :comments="data.comments"
    />
  </div>
</template>

<style lang="css" scoped>
.show {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--spacing-4);
}

.text::first-letter {
  margin-right: 0.25em;
  initial-letter: 2;
}
</style>
