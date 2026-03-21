<template>
  <span>Lees verder</span>
</template>

<style lang="css" scoped>
span {
  display: inline-block;
  width: auto;
  padding: var(--spacing-1) var(--spacing-2);
  margin-inline: var(--spacing-1);
  font-family: var(--font-family-heading);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-heading);
  color: var(--color-secondary);
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  background-color: transparent;
  border-radius: 3px;
  corner-shape: scoop;
  box-shadow: 0 0 0 1px var(--color-secondary);
  transition: background-color var(--transition);

  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  &:disabled {
    color: var(--text-on-secondary);
    background: transparent;
    border: 2px dashed var(--text-on-secondary);

    &.active,
    &:hover {
      background: transparent;
    }
  }
}
</style>
