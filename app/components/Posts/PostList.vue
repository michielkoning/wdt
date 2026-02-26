<script lang="ts" setup>
const { data } = useFetch('/api/posts')
</script>

<template>
  <center-wrapper v-if="data">
    <h2>
      Laatste berichten
    </h2>
    <ul v-if="data.length">
      <li
        v-for="item in data"
        :key="item.id"
      >
        <div>
          <app-image
            v-if="item.image"
            :image="item.image"
          />
        </div>
        <div>
          <h3>
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
          </h3>
          {{ $d(new Date(item.date), 'short') }}
          <div v-html="item.excerpt" />
        </div>
      </li>
    </ul>
  </center-wrapper>
</template>

<style lang="css" scoped>
ul {
  padding-left: 0;
  margin-bottom: 0;
  list-style: none outside;
}

li {
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-4);
}
</style>
