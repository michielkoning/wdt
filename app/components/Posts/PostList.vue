<script lang="ts" setup>
const { data } = useFetch('/api/posts')
</script>

<template>
  <center-wrapper v-if="data">
    <h1>Laatste berichten</h1>
    <ul v-if="data.length">
      <li
        v-for="item in data"
        :key="item.id"
      >
        {{ $d(new Date(item.date), 'short') }}
        <nuxt-link-locale
          :to="{
            name: 'post',
            params: {
              slug: item.slug,
            },
          }"
        >
          {{ item.title }}
        </nuxt-link-locale>
      </li>
    </ul>
  </center-wrapper>
</template>
