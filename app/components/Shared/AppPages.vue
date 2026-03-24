<script lang="ts" setup>
const props = defineProps<{
  parentId: number
}>()

const { data } = await useFetch('/api/pages', {
  query: {
    parentId: props.parentId,
  },
})

let observer: IntersectionObserver | undefined

const activeLinks: Ref<string[]> = ref([])
const wrappers = useTemplateRef('wrapper')

onMounted(() => {
  if (!wrappers.value) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
          activeLinks.value = [...activeLinks.value, entry.target.id]
        }
        else {
          activeLinks.value = activeLinks.value.filter(item => item !== entry.target.id)
        }
      })
    },
    { rootMargin: '0px 0px 0px 0px' },
  )
  console.log(wrappers.value)

  wrappers.value.forEach((wrapper) => {
    if (observer) {
      observer.observe(wrapper)
    }
  })
})
onUnmounted(() => {
  if (!wrappers.value || !observer) return
  wrappers.value.forEach((wrapper) => {
    if (observer) {
      observer.unobserve(wrapper)
    }
  })
})
</script>

<template>
  <div
    v-if="data"
    class="content"
  >
    <div>
      <div
        v-for="item in data"
        :id="`link-${item.id}`"
        :key="item.id"
        ref="wrapper"
        class="wrapper"
      >
        <h1>
          {{ item.title }}
        </h1>
        <div v-html="item.content" />
      </div>
    </div>
    <nav>
      <ol>
        <li
          v-for="item in data"
          :id="`link-${item.id}`"
          :key="item.id"
        >
          <router-link
            :to="{
              hash: `#link-${item.id}`,
            }"
            :class="{ active: activeLinks.includes(`link-${item.id}`) } "
          >
            {{ item.title }}
          </router-link>
        </li>
      </ol>
    </nav>
  </div>
</template>

<style lang="css" scoped>
@import "~/assets/css/media-queries/media-queries.css";

.content {
  position: relative;
  clear: both;
  display: grid;
  gap: var(--spacing-4);
  align-items: start;

  @media (--viewport-md) {
    grid-template-columns: auto 12rem;
  }
}

.wrapper {
  clear: both;
  scroll-padding-top: var(--spacing-4);
}

nav {
  position: sticky;
  inset-block-start: 0;
  order: -1;
  padding-block: var(--spacing-2);

  @media (--viewport-md) {
    inset-block-start: var(--spacing-4);
    order: 1;
  }
}

ol {
  @mixin list-reset;

  padding-block-start: env(safe-area-inset-top);
  background-color: var(--color-dominant);
}

li:not(:last-child) a::after {
  position: absolute;
  inset: var(--spacing-3) auto calc(-1 * var(--spacing-2)) 0.325rem;
  display: block;
  inline-size: 2px;
  content: "";
  background-color: var(--color-accent);
}

a {
  position: relative;
  display: flex;
  gap: var(--spacing-2);
  align-items: start;
  padding-block-end: var(--spacing-1);
  text-decoration: none;

  &::before {
    position: relative;
    z-index: 1;
    display: block;
    flex: 0 0 auto;
    inline-size: var(--spacing-3);
    aspect-ratio: 1;
    content: "";
    background-color: var(--color-dominant);
    border: 2px solid var(--color-dominant);
    border-radius: 50%;
    box-shadow: 0 0 0 2px var(--color-accent);
    translate: 0 0.4rem;
    transition: background-color var(--transition);
  }

  &.active,
  &:hover {
    &::before {
      background-color: var(--color-accent);
    }
  }
}
</style>
