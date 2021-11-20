<template>
  <div class="q-pa-sm">
    <q-input
      :label="label"
      label-color="white"
      :model-value="model"
      v-model="model"
      @keyup.enter="addValue"
      @keyup.space="addValue"
      @keyup.tab="addValue"
      dense
    />
    <div class="flex q-gutter-md">
      <q-chip
        v-for="(v, index) in values"
        :key="index"
        removable
        :label="v"
        @remove="removeValue(index)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'ChipInput',
  props: {
    modelValue: Array,
    label: String
  },
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    const model = ref('');
    const values = ref<string[]>([]);
    function addValue() {
      if(model.value)values.value.push(model.value);
      model.value = '';
      emit('update:modelValue', values.value);
    }
    function removeValue(index: number) {
      values.value.splice(index, 1);
      emit('update:modelValue', values.value);
    }
    return {
      values,
      removeValue,
      addValue,
      model
    }
  }
})
</script>

<style scoped>

</style>
