<template>
  <vue-tel-input
    mode="international"
    :value="modelValue"
    @validate="$emit('update:modelValue', $event.formatted)"
    :inputOptions="{placeholder: $t('phoneNumber')}"
    :style="`border:1px solid ${ modelValue ? 'gainsboro' : 'red'};`"
  />
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'PhoneInput',
  props: {
    modelValue: String
  },
  emits: ['update:modelValue'],
})
</script>

<style lang="scss">
.vti__dropdown-list {
  background: $primary;
  max-width: 90vw;
}
.vti__dropdown-item.highlighted{background-color:$amber}
.vti__input{
  background: transparent;
  color: white;
  height: 40px;
  &::-webkit-input-placeholder {color: white;}
  &::-moz-placeholder          {color: white;}
  &::-ms-input-placeholder      {color: white;}
}
.vue-tel-input{
  border-radius: 20px;
  &:focus-within{
    -webkit-box-shadow: unset;
    box-shadow: unset;
    border-color: $primary
  }
}
</style>
