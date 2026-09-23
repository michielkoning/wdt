<script lang="ts" setup>
const search = defineModel<string>('search', {
  required: true,
})

const directors = defineModel<number | undefined>('directors', {
  required: true,
})

const authors = defineModel<number | undefined>('authors', {
  required: true,
})
</script>

<template>
  <search>
    <form @submit.prevent>
      <div class="search">
        <search-field
          v-model="search"
          name="search"
        />
      </div>
      <shows-filter-item
        v-model="directors"
        type="directors"
      />
      <shows-filter-item
        v-model="authors"
        type="authors"
      />
    </form>
  </search>
</template>

<style lang="css" scoped>
form {
  display: grid;
  gap: var(--spacing-2);

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
