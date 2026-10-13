<template>
  <div class="follow-us">
    <div class="icons">
      <nuxt-link
        to="https://www.instagram.com/wdttoneel/"
        external
      >
        <icon
          class="icon"
          name="streamline-logos:instagram-logo-1"
        />
      </nuxt-link>
      <nuxt-link
        to="https://www.facebook.com/Toneelvereniging-WDT-Wageningen-281724261856217/"
        external
      >
        <icon
          class="icon"
          name="streamline-logos:facebook-logo-2"
        />
      </nuxt-link>
      <div class="text">
        Volg ons op Facebook en Instagram
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.icons {
  display: flex;
  gap: var(--spacing-2);
}

a {
  color: var(--landmark-fg);
}

svg {
  inline-size: 1em;
  block-size: 1em;
  aspect-ratio: 1;
  margin-block-start: var(--spacing-1);
  font-size: 2em;
}

.text {
  max-inline-size: 12em;
}
</style>
