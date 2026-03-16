<script lang="ts" setup>
const menu = useTemplateRef('menu')

const closePopover = () => {
  if (!menu.value) {
    return
  }
  menu.value.hidePopover()
}
</script>

<template>
  <header>
    <h1>Toneelvereniging WDT Wageningen</h1>

    <button
      popovertarget="menu"
    >
      Menu
      <icon
        name="solar:hamburger-menu-linear"
        class="icon"
      />
    </button>
    <nav>
      <ol
        id="menu"
        ref="menu"
        popover
      >
        <li>
          <nuxt-link-locale
            :to="{
              name: 'home',
            }"
            @click="closePopover"
          >
            Home
          </nuxt-link-locale>
        </li>
        <li>
          <nuxt-link-locale
            :to="{
              name:
                'shows',
            }"
            @click="closePopover"
          >
            Voorstellingen
          </nuxt-link-locale>
        </li>
        <li>
          <nuxt-link-locale
            :to="{
              name: 'posts',
            }"
            @click="closePopover"
          >
            Nieuws
          </nuxt-link-locale>
        </li>
        <li>
          <nuxt-link-locale
            :to="{
              name: 'page',
              params: {
                slug: 'over-wdt',
              },
            }"
            @click="closePopover"
          >
            Over WDT
          </nuxt-link-locale>
        </li>
      </ol>
    </nav>
  </header>
</template>

<style lang="css" scoped>
@import "~/assets/css/media-queries/media-queries.css";

header {
  padding-block: var(--spacing-4);
}

h1 {
  font-size: var(--font-size-h2);

  @media (--viewport-md) {
    font-size: var(--font-size-h1);
  }
}

::backdrop {
  background-color: rgb(0 0 0 / 50%);
  backdrop-filter: blur(3px);
}

button {
  display: flex;
  gap: var(--spacing-2);
  align-items: center;
  padding: var(--spacing-2) var(--spacing-4);
  border: 2px solid currentcolor;

  @media (--viewport-md) {
    display: none;
  }
}

nav {
  position: relative;
  font-family: var(--font-family-heading);
  font-size: var(--font-size-h3);
}

ol {
  @mixin list-reset;

  inset: auto 0;
  flex-direction: column;
  gap: var(--spacing-2);
  justify-content: space-between;
  width: 100%;
  padding: var(--spacing-4) var(--gutter);
  position-area: bottom;
  background-color: var(--color-secondary);
  border: 0;
  transition: opacity 0.2s, overlay 0.2s allow-discrete;
  transition-behavior: allow-discrete;

  @media (--viewport-md) {
    position: static;
    display: flex;
    flex-direction: row;
    gap: var(--spacing-4);
    padding-block: 0;
    background-color: transparent;
  }
}

a {
  display: block;
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
</style>
