<script setup lang="ts">
const { title } = useAppConfig()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${title}` : title
  },
})
</script>

<template>
  <nuxt-route-announcer />
  <nuxt-loading-indicator
    color="#f7f2eb"
  />
  <center-wrapper>
    <div class="page">
      <the-header />
      <main
        tabindex="-1"
      >
        <div class="content">
          <nuxt-page />
        </div>
      </main>
      <the-footer />
    </div>
  </center-wrapper>
</template>

<style lang="css" scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom:
    var(
      --spacing-12
    );
}

main {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: var(--spacing-2);
  color: var(--text-on-dominant);
  background-color: var(--color-dominant);
  border-radius: var(--spacing-6);

  /* stylelint-disable-next-line property-no-unknown */
  corner-shape: scoop;
}

/* stylelint-disable */
.content {
   flex: 1 1 auto;
  padding: var(--spacing-4)  var(--gutter);
  background:
    radial-gradient(circle var(--width) at 0 70%, var(--l) 5%, var(--bg) 5% 12%, var(--l) 12% 13%, transparent 13%),
    radial-gradient(circle var(--width) at 100% 70%, var(--l) 5%, var(--bg) 5% 12%, var(--l) 12% 13%, transparent 13%),
    radial-gradient(circle var(--width) at 50% 20%, var(--l) 5%, var(--bg) 5% 12%, var(--l) 12% 13%, transparent 13%),
    radial-gradient(circle calc(var(--width) / 2) at 50% 100%, var(--l) 1%, var(--bg) 1% 17%, var(--l) 17% 19%, var(--bg) 19% 63%, var(--l) 63% 65%, var(--bg) 65% 81%, var(--l) 81% 83%, var(--bg) 83% 99%, var(--l) 99% 101%, transparent 101%),
    radial-gradient(ellipse 5% 26% at 18% 75%, var(--bg) 100%, transparent 100%),
    radial-gradient(ellipse 5% 26% at 82% 75%, var(--bg) 100%, transparent 100%),
    radial-gradient(circle calc(var(--width) / 2) at 0% 100%, var(--l) 1%, var(--bg) 1% 17%, var(--l) 17% 19%, var(--bg) 19% 63%, var(--l) 63% 65%, var(--bg) 65% 81%, var(--l) 81% 83%, var(--bg) 83% 99%, var(--l) 99% 101%, transparent 101%) 0 50%,
    radial-gradient(circle calc(var(--width) / 2) at 100% 100%, var(--l) 1%, var(--bg) 1% 17%, var(--l) 17% 19%, var(--bg) 19% 63%, var(--l) 63% 65%, var(--bg) 65% 81%, var(--l) 81% 83%, var(--bg) 83% 99%, var(--l) 99% 101%, transparent 101%) 0 50%,
    radial-gradient(ellipse 5% 22% at 32% 20%, var(--bg) 100%, transparent 100%),
    radial-gradient(ellipse 5% 22% at 68% 20%, var(--bg) 100%, transparent 100%),
    linear-gradient(90deg, var(--l) 0.5%, var(--bg) 0.5% 8.5%, var(--l) 8.5% 9.5%, var(--bg) 9.5% 17.5%, var(--l) 17.5% 18.5%, var(--bg) 18.5% 31.5%, var(--l) 31.5% 32.5%, var(--bg) 32.5% 40.5%, var(--l) 40.5% 41.5%, var(--bg) 41.5% 49.5%, var(--l) 49.5% 50.5%, var(--bg) 50.5% 58.5%, var(--l) 58.5% 59.5%, var(--bg) 59.5% 67.5%, var(--l) 67.5% 68.5%, var(--bg) 68.5% 81.5%, var(--l) 81.5% 82.5%, var(--bg) 82.5% 90.5%, var(--l) 90.5% 91.5%, var(--bg) 91.5% 99.5%, var(--l) 99.5% 100%);
  background-size: var(--width) calc(var(--width) * 3);
  border: 2px solid var(--color-secondary);
  border-radius: var(--spacing-6);

  corner-shape: scoop;

  --l: #ac47470a;
  --bg: var(--color-dominant);
  --width: 200px;
}
</style>
