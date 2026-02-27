<script lang="ts" setup>
const search = defineModel<string>('search', {
  required: true,
})

const directors = defineModel<number[]>('directors', {
  required: true,
})

const authors = defineModel<number[]>('authors', {
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
      <select-field
        v-model="directors"
        type="directors"
      />
      <select-field
        v-model="authors"
        type="authors"
      />
    </form>
  </search>
</template>

<style lang="css" scoped>
form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-2);
}

.search {
  grid-column: span 2;
}
</style>
