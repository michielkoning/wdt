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
  --color: var(--color-accent);

  @mixin corners var(--spacing-1);

  display: inline-block;
  width: auto;
  padding: var(--spacing-2) var(--spacing-3);
  margin-inline: var(--spacing-1);
  font-family: var(--font-family-heading);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-heading);
  color: var(--text-on-secondary);
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  background-color: var(--color);
  border: 1px solid currentcolor;
  box-shadow: 0 0 0 calc(var(--spacing-1) / 2) var(--color);
  transition: background-color var(--transition), box-shadow  var(--transition);

  &:hover {
    --color: var(--color-accent-300);
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
