<script lang="ts" setup>
import { SearchField, TextField } from '@m11g/library'
import z from 'zod'

const { values } = useForm({
  name: 'filters',
  validationSchema: toTypedSchema(z.object({
    search: z.string().min(1),
  })),
  initialValues: {
    search: '',
  },
})
</script>

<template>
  <search>
    <form @submit.prevent>
      {{ values }}
      <div class="search">
        <text-field
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
