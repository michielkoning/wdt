<script lang="ts" setup>
import type { AsyncDataRequestStatus } from '#app'

defineProps<{
  buttonTitle: string
  successText: string
  status: AsyncDataRequestStatus
}>()

const emit = defineEmits<{
  (e: 'submit-form'): void
}>()

const url = useRequestURL()
</script>

<template>
  <app-notification text="asdsadasd" />
  <p v-if="status === 'success'">
    {{ $t("form.success") }}
  </p>
  <form
    v-else
    :action="url.href"
    @submit.prevent="emit('submit-form')"
  >
    <slot />
    <app-button
      title="Reactie plaatsen"
      type="submit"
      :disabled="status === 'pending'"
    />
  </form>
</template>
