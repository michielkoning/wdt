<script lang="ts" setup>
import { AppButton,
  AppPagination, CenterWrapper,
} from '@m11g/library'

const props = withDefaults(defineProps<{
  variant?: 'all' | 'latest'
  excludeId?: number
}>(), {
  variant: 'all',
  excludeId: undefined,
})

const route = useRoute()
const page = computed(() => route.query.page)

const { data } = await useFetch('/api/posts', {
  query: {
    pageSize: props.variant === 'all' ? 6 : 3,
    page,
    excludeId: props.excludeId,
  },
})

const title = computed(() => {
  if (props.excludeId) {
    return 'Overig nieuws'
  }
  else if (props.variant === 'latest') {
    return 'Laatste nieuws'
  }
  else {
    return 'Nieuws'
  }
})
</script>

<template>
  <section
    v-if="data"
    :aria-label="title"
  >
    <block-wrapper>
      <center-wrapper>
        <h1>
          {{ title }}
        </h1>
        <ul
          v-if="data.items.length"
          :class="variant === 'latest' ? 'highlights' : undefined"
        >
          <post-list-item
            v-for="post in data.items"
            :key="post.id"
            v-bind="post"
          />
        </ul>
        <app-pagination
          v-if="variant==='all'"
          :total-pages="data.totalPages"
        />
        <div
          v-else
          class="btn-wrapper"
        >
          <app-button
            title="Alle berichten"
            to="/nieuws"
          />
        </div>
      </center-wrapper>
    </block-wrapper>
  </section>
</template>

<style lang="css" scoped>
section {
  color: var(--color-secondary-fg);
  background: var(--color-secondary-solid);
}

h1 {
  text-align: center;
}

ul {
  @mixin list-reset;

  display: grid;
  gap: var(--gutter);
  padding-inline-start: 0;
  margin-block-end: var(--spacing-4);
  list-style: none outside;

  &.highlights {
    grid-template-columns: repeat(auto-fill, minmax(16em, 1fr));
  }
}
</style>
