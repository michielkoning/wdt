<script lang="ts" setup>
import AppDivider from '~/components/Shared/AppDivider.vue'

definePageMeta({
  name: 'home',
  i18n: {
    paths: {
      nl: '/',
    },
  },
})

const { data } = useFetch('/api/page', {
  query: {
    slug: 'home',
  },
})
</script>

<template>
  <div>
    <center-wrapper
      v-if="data"
      size="lg"
    >
      <upcoming-show />
      <app-divider variant="stopper" />
      <h1>{{ data.title }}</h1>
      <div v-html="data.content" />
      <app-divider variant="arrow-down" />
      <post-list variant="latest" />
    </center-wrapper>
  </div>
</template>

<style lang="css" scoped>
.divider {
  position: relative;
  height: 1px;
  margin-block: var(--spacing-12);
}

.div-transparent::before {
  position: absolute;
  top: 0;
  right: 5%;
  left: 5%;
  width: 90%;
  height: 1px;
  content: "";
  background-image: linear-gradient(to right, transparent, var(--color-secondary), transparent);
}

.div-arrow-down::after {
  position: absolute;
  top: -7px;
  left: calc(50% - 7px);
  z-index: 1;
  width: 14px;
  height: 14px;
  content: "";
  background-color: white;
  border-right: 1px solid var(--color-secondary);
  border-bottom: 1px solid var(--color-secondary);
  transform: rotate(45deg);
}

.div-tab-down::after {
  position: absolute;
  top: 0;
  left: calc(50% - 10px);
  z-index: 1;
  width: 20px;
  height: 14px;
  content: "";
  background-color: white;
  border-right: 1px solid var(--color-secondary);
  border-bottom: 1px solid var(--color-secondary);
  border-left: 1px solid var(--color-secondary);
  border-radius: 0 0 8px 8px;
}

.div-stopper::after {
  position: absolute;
  top: -6px;
  left: calc(50% - 7px);
  z-index: 1;
  width: 14px;
  height: 12px;
  content: "";
  background-color: white;
  border-right: 1px solid var(--color-secondary);
  border-left: 1px solid var(--color-secondary);
}

.div-dot::after {
  position: absolute;
  top: -9px;
  left: calc(50% - 9px);
  z-index: 1;
  width: 18px;
  height: 18px;
  content: "";
  background-color: goldenrod;
  border: 1px solid var(--color-secondary);
  border-radius: 50%;
  box-shadow:
    inset 0 0 0 2px white,
    0 0 0 4px white;
}
</style>
