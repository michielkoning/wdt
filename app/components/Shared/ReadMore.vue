<template>
  <span>Lees verder</span>
</template>

<style lang="css" scoped>
span {
  display: inline-block;
  inline-size: auto;
  padding: var(--spacing-1) var(--spacing-2);
  margin-inline: var(--spacing-1);
  font-family: var(--font-family-heading);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-heading);
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  background-color: transparent;
  box-shadow: 0 0 0 1px currentcolor;
  transition: background-color var(--transition);

  &:hover {
    text-decoration: 1px solid underline;
    text-underline-offset: 0.25em;
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
