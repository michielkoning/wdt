<script lang="ts" setup>
import type { Comment } from '#imports'

defineProps<{
  id: number
  title: string
  comments: Comment[]
}>()
</script>

<template>
  <block-wrapper class="wrapper">
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
          <time>
            {{ $d(new Date(item.date), 'short') }}
          </time>
        </div>
        <div v-html="item.content" />
      </li>
    </ul>
    <comments-form :id="id" />
  </block-wrapper>
</template>

<style lang="css" scoped>
.wrapper {
  max-width: var(--container-size-md);
  margin-inline: auto;
}

ul {
  @mixin list-reset;
}

time {
  font-size: var(--font-size-sm);
}

.meta {
  margin-block-end: var(--spacing-1);
}

li {
  &:not(:first-child) {
    padding-block-start: var(--spacing-4);
    margin-block-end: var(--spacing-4);
    border-block-end: 2px solid currentcolor;
  }
}
</style>
