<script lang="ts" setup>
defineProps<{
  dates: string[]
}>()
</script>

<template>
  <div v-if="dates.length">
    <h2>Speeldata</h2>
    <ul>
      <li
        v-for="date in dates"
        :key="date"
      >
        {{ $d(new Date(date), 'short') }}
      </li>
    </ul>
  </div>
</template>
