<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    to: string
    external?: boolean
  }>(),
  {
    external: false,
  },
)

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
    await navigateTo(props.to, {
      external: props.external,
    })
  }
}
</script>

<template>
  <li
    class="item"
    @mousedown.left="mouseDown"
    @mouseup.left="mouseUp"
  >
    <slot />
  </li>
</template>

<style lang="css" scoped>
.item {
  cursor: pointer;
}
</style>
