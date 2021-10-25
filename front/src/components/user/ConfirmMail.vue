<template>
  <div class="q-col-gutter-md column items-center">
    <div class="text-center text-h6 text-blue-grey-9">
      Enter the code you received by email
    </div>
    <q-input
      outlined
      :value="confirmation_code"
      label="Enter the Code"
      mask="AAAA - #### - #### - AAAAA"
      hint="AAAA - #### - #### - AAAAA"
      class="register-input-field"
      @input="e => handleChange('confirmation_code', e.target.value)"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ConfirmMail',
    props: {
      confirmation_code: String
    },
    setup() {
      return {
      }
    },
    methods: {
      handleChange (key: string, value: string) {
        this.$emit('handle-change1', key, value);
      }
    }
  });
</script>

<style scoped>

</style>
