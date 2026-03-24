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
  <block-wrapper
    v-if="data"
  >
    <app-modal
      v-if="data.ticketsUrl"
      id="tickets"
      :title="`Tickets voor ${data.title}`"
    >
      <iframe
        title="Ik Ben Aanwezig Shop"
        :src="data.ticketsUrl"
        width="100%"
        height="1400"
        frameborder="0"
      />
    </app-modal>
    <h1>{{ data.title }}</h1>
    <div
      class="show"
    >
      <div class="meta-data">
        <image-card
          v-if="data.image"
          :image="data.image"
          :banner="data.banner"
        />
      </div>
      <div
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
          v-if="data.ticketsUrl"
          title="Koop kaarten"
          class="btn"
          commandfor="tickets"
          command="show-modal"
        />
      </div>
    </div>

    <body-text :text="data.content" />

    <app-divider />
    <app-gallery
      v-if="data.gallery.length"
      :title="data.title"
      :images="data.gallery"
    />
    <comments-list
      v-if="data.comments.length"
      :id="data.id"
      :title="data.title"
      :comments="data.comments"
    />
  </block-wrapper>
</template>

<style lang="css" scoped>
@import "~/assets/css/media-queries/media-queries.css";

.show {
  display: grid;
  gap: var(--spacing-4);
  margin-block-end: var(--spacing-8);

  @media (--viewport-md) {
    grid-template-columns: 1fr 2fr;
  }

  @media (--viewport-lg) {
    margin-block-end: var(--spacing-8);
  }
}

.btn {
  margin-block-start: auto;
}
</style>
