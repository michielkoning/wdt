<script lang="ts" setup>
const menu = useTemplateRef('menu')

const closePopover = () => {
  if (!menu.value) {
    return
  }
  if (menu.value.hasAttribute('popover')) {
    menu.value.hidePopover()
  }
}

let observer: ResizeObserver | undefined

onMounted(() => {
  if (!menu.value) return

  observer = new ResizeObserver(
    (entries) => {
      if (!entries.length || !menu.value) {
        return
      }

      const entry = entries[0]
      if (!entry) {
        return
      }

      if (entry.contentRect.width >= 768) {
        if (menu.value.checkVisibility()) {
          menu.value.removeAttribute('popover')
        }
      }
      else {
        menu.value.setAttribute('popover', '')
      }
    },
  )

  if (observer) {
    observer.observe(document.body)
  }
})
onUnmounted(() => {
  if (!menu.value || !observer) return
  observer.unobserve(menu.value)
})
</script>

<template>
  <header>
    <h1>Toneelvereniging WDT Wageningen</h1>

    <button
      class="btn-open"
      popovertarget="menu"
    >
      <icon
        class="icon"
        name="solar:hamburger-menu-linear"
      />
      Menu
    </button>

    <nav
      id="menu"
      ref="menu"
      popover
    >
      <div class="btn-wrapper">
        <button
          popovertarget="menu"
          class="btn-close"
        >
          <icon

            name="solar:close-circle-bold"
            class="icon"
          />
        </button>
      </div>
      <ol>
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
              name: 'page',
              params: {
                slug: 'geschiedenis',
              },
            }"
            @click="closePopover"
          >
            Geschiedenis
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
      </ol>
    </nav>
  </header>
</template>

<style lang="css" scoped>
@import "~/assets/css/media-queries/media-queries.css";

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

li {
  transition: opacity var(--transition), translate 0.25s var(--transition);
  transition-delay: calc(0.1s * (sibling-index() - 1) + calc(var(--transition-duration) / 2));
}

nav {
  @mixin corners 0 var(--spacing-4) var(--spacing-4) 0;

  inset: 0;
  inline-size: 70vw;
  block-size: 100%;
  padding: var(--spacing-4) var(--gutter);
  margin: 0;
  font-family: var(--font-family-heading);
  font-size: var(--font-size-h3);
  color: var(--text-on-dominant);
  background-color: var(--color-dominant);
  border: 0;
  box-shadow: 0 0 0 2px var(--color-secondary);
  translate: -100% 0;
  transition:
    translate var(--transition),
    overlay var(--transition) allow-discrete,
    display var(--transition) allow-discrete;

  @media (--viewport-md) {
    position: relative;
    display: block;
    inline-size: auto;
    padding: 0;
    color: var(--text-on-secondary);
    background-color: transparent;
    border: 0;
    border-radius: 0;
    box-shadow: none;
    translate: 0 0;
  }

  &:popover-open {
    translate: 0 0;

    &::backdrop {
      animation: show-backdrop var(--transition);
    }

    li {
      opacity: 1;
      translate: 0 0;
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
  backdrop-filter: blur(0.25em);
  animation: hide-backdrop var(--transition);

  @media (--viewport-md) {
    display: none;
  }
}

@starting-style {
  nav:popover-open {
    translate: -100% 0;

    li {
      opacity: 0;
      translate: -1rem 0;
    }
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
    backdrop-filter: blur(0.25em);
  }
}

@keyframes hide-backdrop {
  from {
    opacity: 1;
    backdrop-filter: blur(0.25em);
  }

  to {
    opacity: 0;
    backdrop-filter: blur(0);
  }
}
</style>
