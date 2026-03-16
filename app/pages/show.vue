<script lang="ts" setup>
import AppDivider from '~/components/Shared/AppDivider.vue'

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
      <h1>{{ data.title }}</h1>
      <div
        class="show"
      >
        <div class="meta-data">
          <app-image
            v-if="data.banner"
            :image="data.banner"
            class="banner"
          />
          <app-image
            v-if="data.image"
            :image="data.image"
            class="featured-image"
          />
        </div>
        <theme-wrapper
          variant="white"
          class="content"
        >
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
          <app-button
            title="Koop kaarten"
            class="btn"
          />
        </theme-wrapper>
      </div>

      <div
        class="text"
        v-html="data.content"
      />
    </theme-wrapper>
    <app-divider />
    <app-gallery
      v-if="data.gallery.length"
      :images="data.gallery"
    />
    <app-divider />
    <comments-list
      v-if="data.comments.length"
      :id="data.id"
      :title="data.title"
      :comments="data.comments"
    />
  </div>
</template>

<style lang="css" scoped>
@import "~/assets/css/media-queries/media-queries.css";

.show {
  display: grid;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-4);

  @media (--viewport-md) {
    grid-template-columns: 1fr 2fr;
  }

  @media (--viewport-lg) {
    gap: var(--spacing-8);
    margin-bottom: var(--spacing-8);
  }
}

.banner {
  @media (--viewport-md) {
    display: none;
  }
}

.featured-image {
  display: none;

  @media (--viewport-md) {
    display: block;
  }
}

.text::first-letter {
  margin-right: 0.25em;
  font-family: var(--font-family-heading);
  initial-letter: 2;
}

.btn {
  margin-top: auto;
}
</style>
