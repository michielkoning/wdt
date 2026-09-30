<script lang="ts" setup>
import { ScrollSpy } from '@m11g/library'

const props = defineProps<{
  parentId: number
}>()

const { data } = await useFetch('/api/pages', {
  query: {
    parentId: props.parentId,
  },
  default: () => [],
})

const pages = computed(() => {
  return data.value.map((page) => {
    return {
      id: `page-${page.id}`,
      title: page.title,
      content: page.content,
    }
  })
})
</script>

<template>
  <scroll-spy :pages>
    <template
      v-for="page in pages"
      #[page.id]
      :key="page.id"
    >
      <div v-html="page.content" />
    </template>
  </scroll-spy>
</template>
