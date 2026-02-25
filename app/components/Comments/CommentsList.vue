<script lang="ts" setup>
import type { Comment } from '#imports'

defineProps<{
  id: number
  title: string
  comments: Comment[]
}>()
</script>

<template>
  <center-wrapper size="md">
    <comments-form :id="id" />
    <h2>{{ $t('comments', comments.length) }} op {{ title }}</h2>
    <ul v-if="comments.length">
      <li
        v-for="item in comments"
        :key="item.id"
      >
        <div class="meta">
          <h3>
            {{ item.author }}
          </h3>
          <div class="date">
            {{ $d(new Date(item.date), 'short') }}
          </div>
        </div>
        <div v-html="item.content" />
      </li>
    </ul>
  </center-wrapper>
</template>

<style lang="css" scoped>
ul {
  padding-inline-start: 0;
  margin-bottom: var(--spacing-4);
  list-style: none outside;
}

.date {
  font-size: var(--font-size-sm);
}

.meta {
  margin-bottom: var(--spacing-1);
}

li {
  &:not(:first-child) {
    padding-top: var(--spacing-4);
    margin-bottom: var(--spacing-4);
    border-top: 2px solid currentcolor;
  }
}
</style>
