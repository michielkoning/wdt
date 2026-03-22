<script lang="ts" setup>
const { data } = useFetch('/api/activities')
</script>

<template>
  <div v-if="data">
    <h2>Agenda</h2>
    <ul v-if="data.length">
      <li
        v-for="item in data"
        :key="item.date"
      >
        <!-- {{ $d(new Date(item.date), 'short') }} -->
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
  </div>
</template>

<style lang="css" scoped>
ul {
  @mixin list-reset;
}
</style>
