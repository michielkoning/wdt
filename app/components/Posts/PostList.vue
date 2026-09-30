<script lang="ts" setup>
import { AppButton } from '@m11g/library'

const props = withDefaults(defineProps<{
  variant?: 'all' | 'latest'
  excludeId?: number
}>(), {
  variant: 'all',
  excludeId: undefined,
})

const route = useRoute()
const page = computed(() => route.query.page)

const { data } = useFetch('/api/posts', {
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
    <center-wrapper>
      <h1>
        {{ title }}
      </h1>
      <ul
        v-if="data.items.length"
        :class="variant === 'latest' ? 'highlights' : undefined"
      >
        <clickable-wrapper
          v-for="item in data.items"
          :key="item.id"
          :to="$localePath({
            name: 'post',
            params: {
              slug: item.slug,
            },
          })"
        >
          <div class="item">
            <div class="image-wrapper">
              <app-image
                v-if="item.image"
                :image="item.image"
                class="image featured-image"
              />
            </div>
            <div class="content">
              <h3>
                <nuxt-link-locale
                  class="link"
                  :to="{
                    name: 'post',
                    params: {
                      slug: item.slug,
                    },
                  }"
                >
                  {{ item.title }}
                </nuxt-link-locale>
              </h3>
              <time>
                {{ $d(new Date(item.date), 'short') }}
              </time>
              <div
                class="text"
                v-html="item.excerpt"
              />
              <read-more />
            </div>
          </div>
        </clickable-wrapper>
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
  </section>
</template>

<style lang="css" scoped>
section {
  padding-block: 2em;
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

.link {
  color: currentcolor;
  text-decoration: none;
}

time {
  font-size: var(--font-size-sm);
}

:deep(p) {
  margin-block-end: var(--spacing-2);
}

li {
  position: relative;
  padding-block-end: var(--spacing-2);
  container-name: achive-list;
  container-type: inline-size;

  &:hover,
  &:focus-within {
    a {
      text-decoration: underline;
    }
  }
}

.item {
  block-size: 100%;
  color: var(--color-black);
  background-color: var(--color-white);

  @container achive-list (width > 32em) {
    display: grid;
    grid-template-columns: 14em auto;
    gap: var(--spacing-4);
    padding: var(--spacing-4);
  }
}

.content {
  padding: var(--spacing-2) var(--spacing-4);

  @container achive-list (width > 32em) {
    padding: 0;
  }
}

.text:deep(p) {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  line-clamp: 5;
}

.btn-wrapper {
  display: flex;
  justify-content: center;
}
</style>
