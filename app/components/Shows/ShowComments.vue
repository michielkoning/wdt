<script lang="ts" setup>
import type { Comment } from '#imports'

defineProps<{
  comments: Comment[]
}>()
</script>

<template>
  <div class="comments">
    <center-wrapper>
      <ul v-if="comments.length">
        <li
          v-for="item in comments"
          :key="item.id"
        >
          <div class="meta">
            {{ item.author }}
            {{ $d(new Date(item.date), 'short') }}
          </div>
          <div v-html="item.content" />
        </li>
      </ul>
    </center-wrapper>
  </div>
</template>

<style lang="css" scoped>
ul {
  padding-inline-start: 0;
  margin-bottom: var(--spacing-4);
  list-style: none outside;
}
</style>
