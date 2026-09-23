<script lang="ts" setup>
const formdata = reactive({
  name: '',
  country: '',
})

const options = [{
  value: 'NLD',
  title: 'Netherlands',
}, {
  title: 'Germany',
  value: 'DEU',
}, {
  title: 'Belgium',
  value: 'BEL',
},
]
</script>

<template>
  <center-wrapper>
    <form>
      <form-fieldset
        title="Formulier"
        :colunns="2"
      >
        <text-field
          v-model="formdata.name"
          title="Name"
          name="name"
        />

        <select-field
          v-model="formdata.country"
          title="Country"
          name="country"
          :options
        />
      </form-fieldset>
    </form>
  </center-wrapper>
</template>

<style lang="css" scoped>
form {
  padding-block: var(--spacing-4);
}
</style>
