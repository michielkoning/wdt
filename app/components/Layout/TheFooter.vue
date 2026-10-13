<script lang="ts" setup>
import { CenterWrapper, AppButton } from '@m11g/library'

const subject = encodeURI('Inschrijven voor de wdt nieuwsbrief')
const body = encodeURI('Ik wil me graag inschrijven voor de nieuwsbrief van WDT.')
</script>

<template>
  <footer>
    <center-wrapper>
      <ol>
        <li>
          <h2>Altijd op de hoogte?</h2>
          <div>
            <app-button
              title="Inschrijven op de mailinglist"
              theme="secondary"
              :href="`mailto:info@wdttoneel.nl?body=${body}&subject=${subject}`"
              :external="true"
              class="btn"
            />
          </div>
        </li>
        <li>
          <h2>Meespelen bij WDT?</h2>
          <div>
            <app-button
              title="Over bij WDT"
              theme="secondary"
              to="/over-wdt"
              class="btn"
            />
          </div>
        </li>
        <li>
          <follow-us />
        </li>
        <li>
          Contact<br>
          <a href="mailto:info@wdttoneel.nl">info@wdttoneel.nl</a>
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
  gap: var(--spacing-8) var(--spacing-4);
  justify-content: space-between;
  margin: 0;

  @media (--md) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
