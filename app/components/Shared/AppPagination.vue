<script lang="ts" setup>
defineProps<{
  totalPages: number
}>()

const route = useRoute()

const currentPage = computed(() => route.query.page ? Number(route.query.page) : 1)
</script>

<template>
  <div
    v-if="totalPages > 1"
    class="paging"
  >
    <nuxt-link-locale
      v-if="currentPage > 1"
      :to="{
        query: {
          ...route.query,
          page: currentPage - 1,
        },
      }"
    >
      Vorige pagina
    </nuxt-link-locale>
    <span v-else>Vorige pagina</span>
    <ul>
      <li
        v-for="page in totalPages"
        :key="page"
        :class="{ current: page === currentPage }"
      >
        <nuxt-link-locale
          :to="{
            query: {
              ...route.query,
              page,
            },
          }"
        >
          {{ page }}
        </nuxt-link-locale>
      </li>
    </ul>
    <nuxt-link-locale
      v-if="currentPage < totalPages"
      :to="{
        query: {
          ...route.query,
          page: currentPage + 1,
        },
      }"
    >
      Volgende pagina
    </nuxt-link-locale>
    <span v-else>Volgende pagina</span>
  </div>
</template>

<style lang="css" scoped>
@import "~/assets/css/media-queries/media-queries.css";

.paging {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
  align-items: start;
  justify-content: space-between;
  font-family: var(--font-family-heading);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-heading);
}

ul {
  @mixin list-reset;

  display: flex;
  gap: var(--spacing-2);
  align-items: center;
  justify-content: center;
}

li {
  display: none;

  &:first-child,
  &:last-child {
    display: block;
  }

  &:has(+ .current),
  &:has(+ li + .current),
  &.current {
    &,
    + li,
    + li + li {
      display: block;
    }
  }
}

span,
a {
  display: block;
  padding: var(--spacing-1) var(--spacing-3);
  text-decoration: none;
  border: 1px solid currentcolor;

  &:hover {
    color: var(--color-dominant);
    background-color: var(--text-on-dominant);
  }
}

span {
  display: none;
  visibility: hidden;

  @media (--viewport-md) {
    display: block;
  }
}

a {
  display: block;
}

.current a {
  color: var(--color-dominant);
  background-color: var(--text-on-dominant);
}
</style>
