<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router'

const props = withDefaults(defineProps<{
  to: RouteLocationRaw
  tag?: 'div' | 'li'
}>(), {
  tag: 'li',
})

const down: Ref<number | null> = ref(null)

const mouseDown = (event: MouseEvent) => {
  const target = event.target as Element
  if (
    target.nodeName.toUpperCase() === 'A'
    || target.parentNode?.nodeName.toUpperCase() === 'A'
  ) {
    down.value = null
  }
  else {
    down.value = +new Date()
  }
}
const mouseUp = async () => {
  if (!down.value) {
    return
  }
  const up = +new Date()
  if (up - down.value < 200) {
    await navigateTo(props.to)
  }
}
</script>

<template>
  <component
    :is="tag"
    class="item"
    @mousedown.left="mouseDown"
    @mouseup.left="mouseUp"
  >
    <slot />
  </component>
</template>

<style lang="css" scoped>
.item {
  cursor: pointer;
}
</style>
