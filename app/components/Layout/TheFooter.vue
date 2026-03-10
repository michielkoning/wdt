<template>
  <footer>
    <theme-wrapper variant="secondary">
      <center-wrapper>
        <ol>
          <li>
            <h2>Contact</h2>
            Els Ausema<br>
            M: <a href="mailto:info@wdttoneel.nl">mailto:info@wdttoneel.nl</a>
          </li>

          <li>
            <h2>Theater De Wilde Wereld</h2>
            Burgtstraat 1<br>
            6701 DA Wageningen<br>
          </li>
          <li>
            <activity-list />
          </li>
        </ol>
      </center-wrapper>
    </theme-wrapper>
  </footer>
</template>

<style lang="css" scoped>
footer {
  padding-block: var(--spacing-6);
  margin-inline: var(--gutter);
  margin-top: var(--spacing-6);
  border-top: 2px solid currentcolor;
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
