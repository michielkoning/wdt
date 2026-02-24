<script lang="ts" setup>
const props = defineProps<{
  type: 'directors' | 'authors'
}>()

const { data } = useFetch('/api/taxonomy', {
  query: {
    type: props.type,
  },
})

const model = defineModel<number[]>({
  required: true,
})
</script>

<template>
  <select
    v-if="data"
    v-model="model"
    :name="type"
  >
    <button>
      <selectedcontent />
      <icon
        name="solar:alt-arrow-down-outline"
        class="icon"
      />
    </button>
    <option />
    <option
      v-for="item in data"
      :key="item.id"
      :value="item.id"
    >
      {{ item.name }}
    </option>
  </select>
</template>

<style lang="css" scoped>
.icon {
  transition: rotate var(--transition);
}

select {
  padding: var(--spacing-2) var(--spacing-4);
  appearance: base-select;
  cursor: pointer;

  &:open {
    .icon {
      rotate: -180deg;
    }
  }
}

button {
  display: flex;
  gap: var(--spacing-2);
  align-items: center;
}

::picker-icon,
::checkmark {
  display: none;
}

::picker(select) {
  appearance: base-select;
}

option {
  padding: var(--spacing-2);
  border-left: 2px solid transparent;

  &:hover {
    background-color: grey;
  }

  &:checked {
    background-color: lightgreen;
    border-left-color: green;
  }
}
</style>
