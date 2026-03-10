<template>
  <theme-wrapper variant="secondary">
    <header>
      <center-wrapper>
        <h1>Toneelvereniging WDT Wageningen</h1>
      </center-wrapper>

      <nav>
        <center-wrapper size="lg">
          <ol>
            <li>
              <nuxt-link-locale
                :to="{
                  name: 'home',
                }"
              >
                Home
              </nuxt-link-locale>
            </li>
            <li>
              <nuxt-link-locale
                :to="{
                  name: 'shows',
                }"
              >
                Voorstellingen
              </nuxt-link-locale>
            </li>
            <li>
              <nuxt-link-locale
                :to="{
                  name: 'posts',
                }"
              >
                Berichten
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
              >
                Over WDT
              </nuxt-link-locale>
            </li>
          </ol>
        </center-wrapper>
      </nav>
    </header>
  </theme-wrapper>
</template>

<style lang="css" scoped>
h1 {
  text-align: center;
}

nav {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-h3);
}

ol {
  @mixin list-reset;

  display: flex;
  gap: var(--spacing-4);
  justify-content: space-between;
  margin: 0;
}

a {
  text-decoration: none;
  text-underline-offset: 0.5em;

  &:hover,
  &.router-link-exact-active {
    text-decoration: underline;
  }

  &.router-link-exact-active {
    text-decoration-thickness: 2px;
  }
}
</style>
