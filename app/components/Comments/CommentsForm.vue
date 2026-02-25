<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import z from 'zod'

const props = defineProps<{
  id: number
}>()

const { t } = useI18n()

const validationSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, { error: t('form.error.required') }).default('Michiel'),
    email: z.email({ error: t('form.error.email.incorrect') }).default('mail@michielkoning.nl'),
    comment: z.string().default('Wat een fantastische show'),
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

const url = useRequestURL()

const onSubmit = handleSubmit(() => {
  execute()
})
</script>

<template>
  <p v-if="status === 'success'">
    {{ $t("form.success") }}
  </p>
  <form
    v-else
    name="add-comment"
    :action="url.href"
    method="POST"
    novalidate
    @submit="onSubmit"
  >
    <form-fieldset title="Geef een reactie">
      <text-field
        name="name"
        class="name"
        autocomplete="name"
        :title="$t('form.name')"
      />
      <text-field
        name="email"
        type="email"
        class="email"
        autocomplete="email"
        :title="$t('form.email')"
      />
      <textarea-field
        name="comment"
        type="comment"
        class="comment"
        :title="$t('form.comment')"
      />
    </form-fieldset>
    <form-error-message
      v-if="error"
      :error-message="error.statusText"
    />

    <button
      type="submit"
    >
      Reactie plaatsen
    </button>
  </form>
</template>

<style lang="css" scoped>
form {
  --columns: 2;
}

ul {
  padding-inline-start: 0;
  margin-bottom: var(--spacing-4);
  list-style: none outside;
}

.comment {
  grid-column: span 2;
}
</style>
