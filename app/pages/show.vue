<script lang="ts" setup>
import { AppButton, AppDialog } from '@m11g/library'

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
  return data.value.directors.map(item => item.title)
})

const authors = computed(() => {
  if (!data.value) {
    return []
  }
  return data.value.authors.map(item => item.title)
})

useSeoMeta({
  title: () => data.value?.title,
  ogTitle: () => data.value?.title,
})
</script>

<template>
  <div v-if="data">
    <div class="block-text">
      <center-wrapper>
        <app-dialog
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
        </app-dialog>
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

        <div v-html="data.content" />
      </center-wrapper>
    </div>
    <div class="block-gallery">
      <center-wrapper>
        <app-gallery
          v-if="data.gallery.length"
          class="gallery"
          :title="data.title"
          :images="data.gallery"
        />
      </center-wrapper>
    </div>
    <center-wrapper>
      <comments-list
        v-if="data.comments.length"
        :id="data.id"
        :title="data.title"
        :comments="data.comments"
      />
    </center-wrapper>
  </div>
</template>

<style lang="css" scoped>
.show {
  display: grid;
  gap: var(--spacing-4);
  margin-block-end: var(--spacing-8);

  @media (--md) {
    grid-template-columns: 1fr 2fr;
  }

  @media (--lg) {
    margin-block-end: var(--spacing-8);
  }
}

.btn {
  margin-block-start: auto;
}

.block-text {
  padding-block: var(--spacing-8);
}

.block-gallery {
  background-color: var(--color-black);
}
</style>
