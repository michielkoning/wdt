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
  >
    <theme-wrapper variant="dominant">
      <center-wrapper>
        <h1>{{ data.title }}</h1>
        <div
          class="show"
        >
          <div class="meta-data">
            <app-image
              v-if="data.image"
              :image="data.image"
              class="featured-image"
            />
            <app-button
              title="Koop kaarten"
              class="btn"
            />
          </div>
          <div class="content">
            <theme-wrapper variant="white">
              <div v-html="data.excerpt" />
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

              <show-dates
                v-if="data.dates.length"
                :dates="data.dates"
              />
            </theme-wrapper>
          </div>
        </div>
      </center-wrapper>

      <center-wrapper size="md">
        <div
          class="text"
          v-html="data.content"
        />
      </center-wrapper>
    </theme-wrapper>
    <app-gallery
      v-if="data.gallery.length"
      :images="data.gallery"
    />

    <comments-list
      v-if="data.comments.length"
      :id="data.id"
      :title="data.title"
      :comments="data.comments"
    />
  </div>
</template>

<style lang="css" scoped>
.show {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--spacing-8);
  margin-bottom: var(--spacing-8);
}

.text::first-letter {
  margin-right: 0.25em;
  font-family: var(--font-family-heading);
  initial-letter: 2;
}

.btn {
  width: 100%;
}

.featured-image {
  margin-bottom: var(--spacing-4);
}
</style>
