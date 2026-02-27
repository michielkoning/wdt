<script lang="ts" setup>
const { data } = useFetch('/api/activities')
</script>

<template>
  <block-wrapper
    v-if="data"
    class="activities"
  >
    <center-wrapper>
      <h1>Agenda</h1>
      <ul v-if="data.length">
        <li
          v-for="item in data"
          :key="item.date"
        >
          {{ $d(new Date(item.date), 'short') }}
          <nuxt-link-locale
            :to="{
              name: item.type,
              params: {
                slug: item.slug,
              },
            }"
          >
            {{ item.title }}
          </nuxt-link-locale>
        </li>
      </ul>
      <p v-else>
        Geen activiteit gevonden
      </p>
    </center-wrapper>
  </block-wrapper>
</template>
