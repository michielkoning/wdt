<script lang="ts" setup>
import { SelectField } from '@m11g/library'

const props = defineProps<{
  type: 'directors' | 'authors'
}>()

const { data } = useFetch('/api/taxonomy', {
  query: {
    type: props.type,
  },

})

const baseOption = {
  title: '',
  value: '',
}
</script>

<template>
  <select-field
    v-if="data"
    :title="type"
    :name="type"
    :options="[baseOption, ...data]"
  />
</template>
