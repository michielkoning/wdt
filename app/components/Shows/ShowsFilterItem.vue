<script lang="ts" setup>
const props = defineProps<{
  type: 'directors' | 'authors'
}>()

const { data } = useFetch('/api/taxonomy', {
  query: {
    type: props.type,
  },
})

const model = defineModel<number | undefined>({
  required: true,
})
</script>

<template>
  <select-field
    v-if="data"
    v-model="model"
    :title="type"
    :name="type"
    :options="data"
  />
</template>
