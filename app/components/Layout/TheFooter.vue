<script lang="ts" setup>
import { CenterWrapper } from '@m11g/library'
</script>

<template>
  <footer>
    <center-wrapper :bottom="true">
      <ol>
        <li>
          <h2>Contact</h2>
          Els Ausema<br>
          M: <a href="mailto:info@wdttoneel.nl">info@wdttoneel.nl</a>
        </li>

        <li>
          <h2>Adres</h2>
          Theater De Wilde Wereld<br>
          Burgtstraat 1<br>
          6701 DA Wageningen<br>
        </li>
        <!-- <li>
          <activity-list />
        </li> -->
      </ol>
    </center-wrapper>
  </footer>
</template>

<style lang="css" scoped>
footer {
  padding-block: var(--spacing-6) var(--spacing-16);
  color: var(--color-white);
  background: var(--color-black);
}

a {
  color: currentcolor;
}

ol {
  @mixin list-reset;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14em, 1fr));
  gap: var(--spacing-4);
  justify-content: space-between;
  margin: 0;
}
</style>
