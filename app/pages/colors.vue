<template>
  <div class="test">
    <div
      v-for="n in 10"
      :key="n"
      :style="{ background: `var(--color-dominant-${n}00)` }"
      class="a"
    />
  </div>
  <div class="test">
    <div
      v-for="n in 10"
      :key="n"
      :style="{ background: `var(--color-secondary-${n}00)` }"
      class="a"
    />
  </div>
  <div class="test">
    <div
      v-for="n in 10"
      :key="n"
      :style="{ background: `var(--color-accent-${n}00)` }"
      class="a"
    />
  </div>
</template>

<style lang="css" scoped>
@import "~/assets/css/media-queries/media-queries.css";

.test {
  display: flex;
  gap: 5px;
  padding: 5px;
  background-color: white;
}

.a {
  inline-size: 100px;
  aspect-ratio: 1;
  background-color: var(--color-dominant-100);
}

header {
  padding-block: var(--spacing-4);
}

.btn-open {
  @mixin corners var(--spacing-1);

  display: flex;
  gap: var(--spacing-2);
  align-items: center;
  padding: var(--spacing-2) var(--spacing-4);
  color: currentcolor;
  border: 2px solid currentcolor;

  @media (--viewport-md) {
    display: none;
  }
}

.btn-wrapper {
  display: flex;
  justify-content: end;

  @media (--viewport-md) {
    display: none;
  }
}

.btn-close {
  color: currentcolor;

  @media (--viewport-md) {
    display: none;
  }
}

.icon {
  inline-size: 1.5em;
  block-size: 1.5em;
}

nav {
  inset: 0;
  flex-direction: column;
  gap: var(--spacing-2);
  justify-content: space-between;
  inline-size: 70vw;
  block-size: 100%;
  padding: var(--spacing-4) var(--gutter);
  margin: 0;
  font-family: var(--font-family-heading);
  font-size: var(--font-size-h3);
  color: var(--text-on-dominant);
  background-color: var(--color-dominant);
  border: 0;
  border-inline-end: 2px solid var(--color-secondary);
  translate: -100% 0;
  transition:
    translate var(--transition),
    overlay var(--transition) allow-discrete,
    display var(--transition) allow-discrete;

  @media (--viewport-md) {
    position: static;
    display: block;
    inline-size: auto;
    padding: 0;
    color: var(--text-on-secondary);
    background-color: transparent;
    border: 0;
    translate: 0 0;
  }

  &:popover-open {
    translate: 0 0;

    &::backdrop {
      animation: show-backdrop var(--transition);
    }
  }
}

ol {
  @mixin list-reset;

  @media (--viewport-md) {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-4);
    justify-content: space-between;
  }
}

::backdrop {
  background-color: rgb(0 0 0 / 50%);
  animation: hide-backdrop var(--transition);

  @media (--viewport-md) {
    display: none;
  }
}

@starting-style {
  nav:popover-open {
    translate: -100% 0;
  }
}

a {
  display: block;
  padding-block: var(--spacing-1);
  text-decoration: none;
  text-underline-offset: 0.35em;

  &:hover,
  &.router-link-exact-active {
    text-decoration: underline;
  }

  &.router-link-exact-active {
    text-decoration-thickness: 2px;
  }
}

@keyframes show-backdrop {
  from {
    opacity: 0;
    backdrop-filter: blur(0);
  }

  to {
    opacity: 1;
    backdrop-filter: blur(3px);
  }
}

@keyframes hide-backdrop {
  from {
    opacity: 1;
    backdrop-filter: blur(3px);
  }

  to {
    opacity: 0;
    backdrop-filter: blur(0);
  }
}
</style>
