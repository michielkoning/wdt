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
    <form-fieldset
      title="Geef een reactie"
      class="fieldset"
    >
      <div class="name">
        <text-field
          name="name"
          autocomplete="name"
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

    <app-button
      title="Reactie plaatsen"
      type="submit"
    />
  </form>
</template>

<style lang="css" scoped>
@import "~/assets/css/media-queries/media-queries.css";

.fieldset {
  @media (--viewport-md) {
    --columns: 2;
  }
}

ul {
  @mixin list-reset;
}

.comment {
  grid-column: span var(--columns);
}
</style>
