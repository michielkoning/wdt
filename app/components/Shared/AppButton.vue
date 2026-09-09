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
  inline-size: auto;
  padding: var(--spacing-2) var(--spacing-8);
  margin-inline: var(--spacing-1);
  font-family: var(--font-family-heading);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-heading);
  color: var(--color-white);
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  background-color: var(--color-red);
  border: 0;
  border-radius: 0.5em;
  transition: background-color var(--transition), box-shadow var(--transition);

  &:hover {
    background-color: var(--color-red-700);
  }

  &:disabled {
    color: var(--color-white);
    background: transparent;
    border: 2px dashed var(--color-white);

    &.active,
    &:hover {
      background: transparent;
    }
  }
}
</style>
