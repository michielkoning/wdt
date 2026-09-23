<script lang="ts" setup>
const props = defineProps<{
  // type: 'directors' | 'authors'
  name: string
  title: string
  options: {
    value: string | number
    title: string
  }[]
}>()

const model = defineModel<string | number | undefined>({
  required: true,
})

const id = useId()

defineOptions({
  inheritAttrs: false,
})

const { name } = toRefs(props)

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const { value: inputValue, handleBlur, handleChange, errorMessage } = useField<string>(name, undefined, {
  validateOnValueUpdate: false,
})

const validationListeners = {
  blur: (evt: Event) => handleBlur(evt, true),
  change: handleChange,
  input: (evt: Event) => handleChange(evt, !!errorMessage.value),
}
</script>

<template>
  <form-field
    :id
    :title
    :error-message="errorMessage"
  >
    <select
      :id
      v-model="model"
      :name
      v-bind="$attrs"
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
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.title }}
      </option>
    </select>
  </form-field>
</template>

<style lang="css" scoped>
.icon {
  transition: rotate var(--transition);
}

select {
  --input-border-color: var(--color-black);
  --input-background-color: var(--color-white);

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
  inline-size: 100%;
}

::checkmark {
  display: none;
}

::picker-icon {
  display: none;
}

::picker(select) {
  margin-block-start: var(--spacing-1);
  appearance: base-select;
  border: 2px solid var(--color-black);
  opacity: 0;
  translate: 0 calc(-1 * var(--spacing-4));
  transition:
    translate var(--transition),
    opacity var(--transition),
    overlay var(--transition) allow-discrete,
    display var(--transition) allow-discrete;
}

:open::picker(select) {
  opacity: 1;
  translate: 0 0;
}

@starting-style {
  :open::picker(select) {
    opacity: 0;
    translate: 0 calc(-1 * var(--spacing-4));
  }
}

option {
  display: flex;
  gap: var(--spacing-2);
  padding: var(--spacing-2);
  color: var(--color-black);
  background-color: var(--color-white);
  border-inline-start: 3px solid transparent;

  &:hover {
    color: var(--color-white);
    background-color: var(--color-black);
  }

  &:checked {
    font-weight: var(--font-weight-bold);
    color: var(--color-black);
    background-color: var(--color-white);
    border-inline-start-color: var(--color-black);

    &:hover {
      color: var(--color-white);
      background-color: var(--color-black);
    }
  }
}
</style>
