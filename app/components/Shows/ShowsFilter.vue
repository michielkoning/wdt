<script lang="ts" setup>
import { SearchField } from '@m11g/library'
</script>

<template>
  <search>
    <form @submit.prevent>
      <div class="search">
        <search-field
          title="Zoeken"
          name="search"
        />
      </div>
      <shows-filter-item
        type="directors"
      />
      <shows-filter-item
        type="authors"
      />
    </form>
  </search>
</template>

<style lang="css" scoped>
form {
  display: grid;
  gap: var(--spacing-2) var(--spacing-4);

  @media (--md) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.search {
  @media (--md) {
    grid-column: span 2;
  }
}
</style>
