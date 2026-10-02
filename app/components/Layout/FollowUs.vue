<template>
  <div>
    <h2>Volg ons</h2>
    <div class="icons">
      <icon
        class="icon"
        name="streamline-logos:instagram-logo-1"
      />
      <nuxt-link
        to="https://www.facebook.com/Toneelvereniging-WDT-Wageningen-281724261856217/"
        external
      >
        <icon
          class="icon"
          name="streamline-logos:facebook-logo-2"
        />
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="css" scoped>
.icons {
  display: flex;
  gap: var(--spacing-3);
}

a {
  color: var(--landmark-fg);
}

svg {
  inline-size: 1em;
  block-size: 1em;
  aspect-ratio: 1;
  font-size: 2em;
}
</style>
