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
    return 'Overige berichten'
  }
  else if (props.variant === 'latest') {
    return 'Laatste berichten'
  }
  else {
    return 'Alle berichten'
  }
})
</script>

<template>
  <div
    v-if="data"
  >
    <h2>
      {{ title }}
    </h2>
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
          <div>
            <app-image
              v-if="item.image"
              :image="item.image"
              class="image"
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
  </div>
</template>

<style lang="css" scoped>
ul {
  @mixin list-reset;

  padding-left: 0;
  margin-bottom: 0;
  list-style: none outside;

  &.highlights {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16em, 1fr));
    gap: var(--gutter);
  }
}

a {
  text-decoration: none;
}

li {
  margin-bottom: var(--spacing-4);
  container-name: achive-list;
  container-type: inline-size;

  &:hover,
  &:focus-within {
    a {
      text-decoration: underline;
    }
  }
}

.wrapper {
  @container achive-list (width > 32em) {
    display: grid;
    grid-template-columns: 1fr 4fr;
    gap: var(--spacing-4);
  }
}

.image {
  margin-bottom: var(--spacing-4);
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
