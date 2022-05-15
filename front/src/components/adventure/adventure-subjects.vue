<template>
  <div class="flex justify-between q-gutter-sm col-12">
    <q-checkbox
      :model-value="subject.id"
      v-for="subject in $tm('adventure-subjects')"
      :key="subject.id"
      :val="subject.id"
      :label="subject.title"
      color="orange"
      keep-color
      v-model="model"
      @update:model-value="singleSelect(subject.id)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'CollectionSubjects',
  props: {
    modelValue: {
      type: Number,
      default: -1
    },
    nullable: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}){
    const model = ref<string[]>([]);
    function singleSelect (val: any) {
      model.value = props.nullable ? model.value.filter(v => v === val) : [val];
      emit('update:modelValue', model.value.length ? Number(val) : -1)
    }
    watch(() => props.modelValue, val => {
      model.value = [String(val)];
    }, { immediate: true });

    return {
      model,
      singleSelect
    }
  }
})
</script>

<style scoped>

</style>
