<script lang="ts" setup>
import AppButton from '../Shared/AppButton.vue'
import AppPagination from '../Shared/AppPagination.vue'

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
  <block-wrapper
    v-if="data"
  >
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
        <div class="wrapper">
          <div class="image-wrapper">
            <app-image
              v-if="item.image"
              :image="item.image"
              class="image featured-image"
            />
          </div>
          <div>
            <h3>
              <nuxt-link-locale
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
            {{ $d(new Date(item.date), 'short') }}
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
        :to="{
          name: 'posts',
        }"
      />
    </div>
  </block-wrapper>
</template>

<style lang="css" scoped>
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

a {
  text-decoration: none;
}

:deep(p) {
  margin-block-end: var(--spacing-2);
}

li {
  position: relative;
  padding-block-end: var(--spacing-2);
  container-name: achive-list;
  container-type: inline-size;

  &::after {
    display: block;
    block-size: 2px;
    margin-block-start: var(--spacing-2);
    content: "";
    background-image: linear-gradient(to left, transparent, currentcolor, transparent);
  }

  &:hover,
  &:focus-within {
    a {
      text-decoration: underline;
    }
  }
}

.wrapper {
  block-size: 100%;

  @container achive-list (width > 32em) {
    display: grid;
    grid-template-columns: 1fr 4fr;
    gap: var(--spacing-4);
  }
}

.image {
  margin-block-end: var(--spacing-4);
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
