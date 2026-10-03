<script lang="ts" setup>
import { CenterWrapper, AppButton } from '@m11g/library'
</script>

<template>
  <footer>
    <center-wrapper :bottom="true">
      <ol>
        <li>
          <h2>Meespelen bij WDT?</h2>
          <div>
            <app-button
              title="Meespelen bij WDT"
              theme="secondary"
              to="/contact"
              class="btn"
            />
          </div>
          <a
            href="mailto:info@wdttoneel.nl"
            class="link"
          >info@wdttoneel.nl</a>
        </li>

        <li>
          <h2>Adres</h2>
          Theater De Wilde Wereld<br>
          Burgtstraat 1<br>
          6701 DA Wageningen<br>
        </li>
        <li>
          <follow-us />
        </li>
      </ol>
    </center-wrapper>
  </footer>
</template>

<style lang="css" scoped>
footer {
  padding-block: var(--spacing-8) var(--spacing-16);
  font-family: var(--font-family-heading);
  color: var(--color-white);
  background: var(--color-black);
}

.link {
  color: currentcolor;
}

.btn {
  inline-size: auto;
  margin-block-end: var(--spacing-3);
}

ol {
  @mixin list-reset;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16em, 1fr));
  gap: var(--spacing-8) var(--spacing-4);
  justify-content: space-between;
  margin: 0;
}
</style>
