<template>
  <q-input
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :type="type ? 'password' : 'text'"
    :lazy-rules="true"
    :rules="[v => v && v.length >= 4 && v.length <= 15 || 'Nombre de caractères entre 4 à 15']"
    hide-bottom-space
    color="orange"
    no-error-icon
    hide-hint
    dense
  >
    <template v-slot:append>
      <q-icon
        v-if="modelValue"
        color="orange"
        class="cursor-pointer"
        :name="type ? 'visibility' : 'visibility_off'"
        @click="type = !type"
      />
    </template>
    <template v-slot:prepend>
      <q-icon color="orange" name="lock"/>
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'PasswordInput',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  data() {
    return {
      type: true
    }
  }
};
</script>

<style scoped>

</style>
