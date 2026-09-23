<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import z from 'zod'

const props = defineProps<{
  id: number
}>()

const { t } = useI18n()

const validationSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, { error: t('form.error.required') }).default(''),
    email: z.email({ error: t('form.error.email.incorrect') }).default(''),
    comment: z.string().min(1, { error: t('form.error.required') }).default(''),
  }),
)

const { values, handleSubmit } = useForm({
  name: 'add-comment',
  validationSchema: validationSchema,
})

const { start, finish } = useLoadingIndicator()

const { execute, error, status } = useFetch('/api/add-comment', {
  method: 'POST',
  immediate: false,
  watch: false,
  onRequest: start,
  onResponse: finish,
  body: {
    ...values,
    id: props.id,
  },
})

const onSubmit = handleSubmit(async () => {
  await execute()
})
</script>

<template>
  <app-form
    :success-text="$t('form.success')"
    button-title="Reactie plaatsen"
    method="POST"
    :status
    @submit-form="onSubmit"
  >
    <form-fieldset
      title="Geef een reactie"
      class="fieldset"
      :colunns="2"
    >
      <div class="name">
        <text-field
          autocomplete="name"
          name="name"
          :title="$t('form.name')"
        />
      </div>
      <div class="email">
        <text-field
          name="email"
          type="email"
          autocomplete="email"
          :title="$t('form.email')"
        />
      </div>
      <div class="comment">
        <textarea-field
          name="comment"
          type="comment"
          rows="4"
          :title="$t('form.comment')"
        />
      </div>
    </form-fieldset>
    <form-error-message
      v-if="error"
      :error-message="error.statusText"
    />
  </app-form>
</template>

<style lang="css" scoped>
ul {
  @mixin list-reset;
}

.comment {
  grid-column: span 2;
}
</style>
