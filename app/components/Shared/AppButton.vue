<script lang="ts" setup>
import type { NuxtLinkProps } from '#app'

const props = withDefaults(
  defineProps<
    NuxtLinkProps & {
      type?: 'submit' | 'button'
      variant?: 'primary' | 'ghost'
      title: string
    }
  >(),
  {
    variant: 'primary',
    type: 'button',
  },
)

const component = computed(() => {
  if (props.to) {
    return resolveComponent('NuxtLinkLocale')
  }
  else {
    return 'button'
  }
})

const cssClasses = computed(() => {
  const classes = ['btn']
  classes.push(`btn-${props.variant}`)
  return classes
})
</script>

<template>
  <component
    :is="component"
    :to="to"
    :class="cssClasses"
    :type="component === 'button' ? type : undefined"
  >
    {{ title }}
  </component>
</template>

<style lang="css" scoped>
.btn {
  display: inline-block;
  width: auto;
  padding: var(--spacing-2) var(--spacing-4);
  font-family: var(--font-family-heading);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-heading);
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  background-color: var(--color-accent);
  border: 2px solid transparent;
  transition: background-color var(--transition);

  &:disabled {
    color: var(--text-on-accent);
    background: transparent;
    border: 2px dashed var(--text-on-accent);

    &.active,
    &:hover {
      background: transparent;
    }
  }
}
</style>
