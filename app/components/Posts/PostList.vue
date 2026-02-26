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
  <block-wrapper v-if="data">
    <center-wrapper>
      <h2>
        {{ title }}
      </h2>
      <ul v-if="data.items.length">
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
          <div>
            <app-image
              v-if="item.image"
              :image="item.image"
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
            <div v-html="item.excerpt" />
          </div>
        </clickable-wrapper>
      </ul>
      <app-pagination
        v-if="variant==='all'"
        :total-pages="data.totalPages"
      />
      <app-button
        v-else
        title="Alle berichten"
        :to="{
          name: 'posts',
        }"
      />
    </center-wrapper>
  </block-wrapper>
</template>

<style lang="css" scoped>
ul {
  padding-left: 0;
  margin-bottom: 0;
  list-style: none outside;
}

a {
  text-decoration: none;
}

li {
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-4);

  &:hover,
  &:focus-within {
    a {
      text-decoration: underline;
    }
  }
}
</style>
