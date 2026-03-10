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
    <client-only>
      <button>
        <selectedcontent />
        <icon
          name="solar:alt-arrow-down-outline"
          class="icon"
        />
      </button>
    </client-only>
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
  justify-content: space-between;
  width: 100%;
}

::picker-icon,
::checkmark {
  display: none;
}

::picker(select) {
  margin-top: var(--spacing-1);
  appearance: base-select;
  border: 2px solid var(--text-on-dominant);
}

option {
  padding: var(--spacing-2);
  color: var(--text-on-dominant);
  background-color: var(--color-dominant);
  border-left: 3px solid transparent;

  &:hover {
    color: var(--text-on-secondary);
    background-color: var(--color-secondary);
  }

  &:checked {
    color: var(--text-on-dominant);
    background-color: var(--color-dominant);
    border-left-color: var(--text-on-dominant);

    &:hover {
      color: var(--text-on-secondary);
      background-color: var(--color-secondary);
    }
  }
}
</style>
