<script lang="ts" setup>
import type { NuxtLinkProps } from '#app'

const props = withDefaults(
  defineProps<
    NuxtLinkProps & {
      type?: 'submit' | 'button'
      variant?: 'primary' | 'ghost'
      title: string
      disabled?: boolean
    }
  >(),
  {
    variant: 'primary',
    type: 'button',
    disabled: false,
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
    :disabled
  >
    {{ title }}
  </component>
</template>

<style lang="css" scoped>
.btn {
  --btn-border-radius: 0.5em;
  --btn-background-color: var(--color-red);
  --btn-background-color-hover: var(--color-red-700);
  --btn-background-color-disabled: var(--color-red-300);
  --btn-text-color: var(--color-white);

  display: inline-block;
  inline-size: auto;
  padding: var(--spacing-2) var(--spacing-8);
  font-family: var(--font-family-heading);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-heading);
  color: var(--btn-text-color);
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  background-color: var(--btn-background-color);
  border: 0;
  border-radius: var(--btn-border-radius);
  transition: background-color var(--transition), text-decoration var(--transition);

  &:hover {
    text-decoration: 2px solid underline;
    text-underline-offset: 0.25em;
    background-color: var(--btn-background-color-hover);
  }

  &:active {
    padding-block: calc(var(--spacing-2) + 1px) calc(var(--spacing-2) - 1px);
  }

  &:disabled {
    background-color: var(--btn-background-color-disabled);
  }
}
</style>
