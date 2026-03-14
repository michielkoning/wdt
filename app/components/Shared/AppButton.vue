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
  color: var(--text-on-secondary);
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  background-color: var(--color-secondary);
  border: 2px solid transparent;
  border-radius: var(--spacing-1);

  /* stylelint-disable-next-line property-no-unknown */
  corner-shape: scoop;
  transition: background-color var(--transition);

  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }

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
