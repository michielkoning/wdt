<template>
  <header>
    <center-wrapper>
      <h1>Toneelvereniging WDT Wageningen</h1>
    </center-wrapper>

    <nav>
      <center-wrapper size="md">
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
</template>

<style lang="css" scoped>
h1 {
  margin-block: var(--spacing-6);
  text-align: center;
}

nav {
  padding-block: var(--spacing-2);
  margin-bottom: var(--spacing-4);
  font-size: var(--font-size-h3);
  background-color: var(--color-secondary);
}

ol {
  display: flex;
  gap: var(--spacing-4);
  justify-content: space-between;
  margin: 0;
  list-style: none outside;
}
</style>
