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
  <block-wrapper
    v-if="data"
    class="wrapper"
  >
    <center-wrapper>
      <h1>Agenda</h1>
      <ul v-if="data.length">
        <li
          v-for="item in data"
          :key="item.date"
        >
          <nuxt-time
            class="date"
            :datetime="new Date(item.date)"
            year="numeric"
            month="long"
            day="numeric"
          />
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
  </block-wrapper>
</template>

<style lang="css" scoped>
ul {
  @mixin list-reset;

  border-block-start: 2px solid var(--color-subtle);
}

li {
  display: grid;
  padding: var(--spacing-2) var(--spacing-2);

  @media (--md) {
    grid-template-columns: 5fr 3fr 3fr;
    gap: var(--spacing-2);
  }

  @media (--lg) {
    grid-template-columns: 3fr 5fr 3fr 2fr;
  }

  &:nth-child(even) {
    background-color: var(--color-subtle);
  }

  &:nth-child(odd):last-child {
    border-block-end: 2px solid var(--color-subtle);
  }
}

.date {
  @media (--md) {
    grid-column: span 3;
  }

  @media (--lg) {
    grid-column: span 1;
  }
}
</style>
