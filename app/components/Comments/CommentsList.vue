<script lang="ts" setup>
import type { Comment } from '#imports'

defineProps<{
  id: number
  title: string
  comments: Comment[]
}>()
</script>

<template>
  <block-wrapper>
    <h1>Reacties</h1>
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
    <comments-form :id="id" />
  </block-wrapper>
</template>

<style lang="css" scoped>
ul {
  @mixin list-reset;
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
