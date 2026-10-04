<script lang="ts" setup>
import { CenterWrapper, SearchField } from '@m11g/library'
import { createClient } from '@supabase/supabase-js'
import z from 'zod'

const { defineField } = useForm({
  name: 'filters',
  validationSchema: toTypedSchema(z.object({
    search: z.string(),
  })),
  initialValues: {
    search: '',
  },
})

const [search] = defineField('search')

const { data } = await useAsyncData(`search-${search}`, async () => {
  const supabase = createClient(
    'https://saxltaipjznepdptiptn.supabase.co',
    'sb_publishable_cVIb2h2fs08dA-S4cP42_Q_pP2o_Ihc',
  )
  const { data: response } = await supabase.from('todos')
    .select()
    .ilike('task', `%${search.value}%`)

  const parsed = z.array(z.object({
    id: z.number(),
    task: z.string(),
  })).default([])
  const shows = parsed.safeParse(response)

  if (!shows.success) {
    throw createError({
      statusText: 'a',
    })
  }
  return shows.data
}, {
  watch: [search],
})
</script>

<template>
  <center-wrapper>
    <block-wrapper>
      <search-field
        name="search"
        title="Zoeken"
      />
      <div v-if="data">
        <div
          v-for="show in data"
          :key="show.id"
        >
          {{ show.task }}
        </div>
      </div>
    </block-wrapper>
  </center-wrapper>
</template>
