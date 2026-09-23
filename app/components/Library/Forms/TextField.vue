<script lang="ts" setup>
import type { InputTypeHTMLAttribute } from 'vue'

const props = withDefaults(defineProps<{
  type?: InputTypeHTMLAttribute
  autocomplete?: AutoFillField
  title: string
  name: string
}>(), {
  autocomplete: undefined,
  type: 'text',
})

const id = useId()
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
    :id="id"
    :title="title"
    :error-message="errorMessage"
  >
    <input
      :id
      :name
      :type
      :autocomplete
      :value="inputValue"
      class="field"
      v-on="validationListeners"
    >
  </form-field>
</template>
