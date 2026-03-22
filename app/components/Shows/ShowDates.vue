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
        <icon
          name="solar:check-circle-linear"
          class="icon"
        />
        <!-- {{ $d(new Date(date), 'short') }} -->
      </li>
    </ul>
  </div>
</template>

<style lang="css" scoped>
ul {
  @mixin list-reset;

  margin-bottom: var(--spacing-4);
}

li {
  display: flex;
  gap: var(--spacing-1);
  align-items: start;
}

.icon {
  width: 1em;
  translate: 0 0.25rem;
}
</style>
