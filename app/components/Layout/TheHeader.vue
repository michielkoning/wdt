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
    <center-wrapper>
      <div class="wrapper">
        <nuxt-link-locale
          class="logo"
          :to="{
            name: 'home',
          }"
        >
          Toneelvereniging WDT Wageningen
        </nuxt-link-locale>

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
      </div>
    </center-wrapper>
  </header>
</template>

<style lang="css" scoped>
header {
  position: sticky;
  inset-block-start: 0;
  z-index: var(--z-mobile-navigation);
  padding-block: var(--spacing-4);
  line-height: var(--line-height-heading);
  color: var(--color-white);
  background: var(--color-landmark-bg);
  transition: translate var(--transition);
}

h1 {
  margin-block-end: 0;
}

.wrapper {
  display: flex;
  gap: var(--spacing-3);
  align-items: end;
  justify-content: space-between;

  @media (--md) {
    flex-direction: column;
    align-items: center;
  }

  @media (--lg) {
    flex-direction: row;
    align-items: end;
  }
}

.btn-open {
  display: flex;
  gap: var(--spacing-2);
  align-items: center;
  padding: var(--spacing-2) var(--spacing-4);
  color: currentcolor;
  border: 2px solid currentcolor;

  @media (--md) {
    display: none;
  }
}

.btn-wrapper {
  display: flex;
  justify-content: end;

  @media (--md) {
    display: none;
  }
}

.btn-close {
  margin-block-end: var(--spacing-4);
  color: currentcolor;

  @media (--md) {
    display: none;
  }
}

.icon {
  inline-size: 1.5em;
  block-size: 1.5em;
}

li {
  border-block-end: 1px solid var(--color-white);
  transition: opacity var(--transition), translate 0.25s var(--transition);
  transition-delay: calc(0.1s * (sibling-index() - 1) + calc(var(--transition-duration) / 2));

  &:first-child {
    border-block-start: 1px solid var(--color-white);

    @media (--md) {
      border: 0;
    }

    @media (--lg) {
      display: none;
    }
  }

  @media (--md) {
    border: 0;
  }
}

.logo {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-bold);
}

nav {
  inset: 0;
  inline-size: 90vw;
  block-size: 100%;
  padding: var(--spacing-4) var(--gutter);
  margin: 0;
  font-family: var(--font-family-heading);
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-bold);
  background-color: var(--color-landmark-bg);
  border: 0;
  box-shadow: 0 0 0 2px var(--color-black);
  translate: -100% 0;
  transition:
    translate var(--transition),
    overlay var(--transition) allow-discrete,
    display var(--transition) allow-discrete;

  @media (--md) {
    position: relative;
    display: block;
    inline-size: auto;
    padding: 0;
    font-size: var(--font-size-base);
    text-transform: uppercase;
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

  &::after {
    position: fixed;
    inset-inline-start: anchor(left);
    display: block;
    inline-size: anchor-size(inline);
    block-size: 3px;
    position-anchor: --active-menu;
    pointer-events: none;
    content: "";
    background: var(--color-white);
    transition:
      left var(--transition),
      width var(--transition);
  }
}

.router-link-active {
  anchor-name: --active-menu;
}

ol {
  @mixin list-reset;

  @media (--md) {
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

  @media (--md) {
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
  color: currentcolor;
  text-decoration: none;
  text-underline-offset: 0.35em;
  transition: padding var(--transition);

  &:not(.logo) {
    padding-block: var(--spacing-2);

    @media (--md) {
      padding: 0;
    }
  }

  &:hover,
  &.router-link-exact-active {
    padding-inline-start: var(--spacing-2);

    @media (--md) {
      padding-inline-start: 0;
      text-decoration: underline;
    }
  }

  &.router-link-exact-active {
    border-inline-start: 0.25em solid var(--color-white);

    @media (--md) {
      border-inline-start: 0;
    }
  }

  &.logo.router-link-active {
    padding-inline-start: 0;
    text-decoration: none;
    border-inline-start: 0;
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
