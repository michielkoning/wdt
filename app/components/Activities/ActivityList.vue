<script lang="ts" setup>
// const { data } = await useFetch('/api/activities')

import { CenterWrapper } from '@m11g/library'

const data: Activity[] = [{
  date: '11-12-2026',
  title: 'Algemene leden vergadering',
  id: 0,
  slug: '/',
  type: 'post',
}, {
  date: '12-10-2026',
  title: 'Presentatie montagetheater',
  id: 2,
  slug: '/',
  type: 'show',
}, {
  date: '12-10-2026',
  title: 'Voorstelling korte productie',
  id: 4,
  slug: '/',
  type: 'show',
}, {
  date: '12-11-2026',
  title: 'Voorstelling korte productie',
  id: 5,
  slug: '/',
  type: 'show',
}]
</script>

<template>
  <center-wrapper
    v-if="data"
    class="wrapper"
  >
    <h1>Agenda</h1>
    <ul v-if="data.length">
      <li
        v-for="item in data"
        :key="item.date"
      >
        <div class="date">
          {{ $d(new Date(item.date), 'short') }}
        </div>
        <div class="title">
          {{ item.title }}
        </div>
        <div class="location">
          Wilde Wereld
        </div>
        <div
          v-if="item.type === 'post'"
          class="members-only"
        >
          Members only
        </div>
      </li>
    </ul>
    <p v-else>
      Geen activiteit gevonden
    </p>
  </center-wrapper>
</template>

<style lang="css" scoped>
ul {
  @mixin list-reset;

  border-block-start: 2px solid var(--color-border);
}

li {
  display: grid;
  grid-template-columns: 3fr 5fr 3fr 2fr;
  gap: var(--spacing-2);
  padding-block: var(--spacing-2) var(--spacing-2);
  border-block-end: 2px solid var(--color-border);

  &:nth-child(odd) {
    /* background-color: oklch(96.52% 0.0818 101.03deg); */
  }
}

.wrapper {
  padding-block: var(--spacing-8);
}
</style>
