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
  --color: var(--color-black);

  display: inline-block;
  inline-size: auto;
  padding: var(--spacing-2) var(--spacing-3);
  margin-inline: var(--spacing-1);
  font-family: var(--font-family-heading);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-heading);
  color: var(--color-white);
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  background-color: var(--color);
  border: 0;
  transition: background-color var(--transition), box-shadow var(--transition);

  &:hover {
    --color: var(--color-accent-700);
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
