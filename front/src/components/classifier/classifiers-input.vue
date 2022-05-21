<template>
  <q-select
    :model-value="modelValue"
    emit-value
    map-options
    option-label="label"
    option-value="id"
    color="orange"
    use-input
    hide-selected
    fill-input
    :options="options"
    @filter="filterFn"
    clearable
    @update:model-value="$emit('update:modelValue', $event)"
    popup-content-class="bg-primary q-card--bordered"
    options-dense
    :hide-dropdown-icon="true"
    hide-bottom-space
    outlined
    dense
    style="min-width: 230px"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Classifier } from 'src/graphql/types';

export default defineComponent({
  name: 'ClassifiersInput',
  props: {
    items: {
      type: Array as PropType<Classifier[]>,
      required: true
    },
    modelValue: Number
  },
  emits: ['update:modelValue'],
  setup(props){
    const options = ref<Classifier[]>([...props.items]);
    return{
      options,
      filterFn (val: string, update: any) {
        update(() => {
          const needle = val.toLocaleLowerCase()
          options.value = props.items.filter(v => v.label.toLocaleLowerCase().indexOf(needle) > -1)
        })
      },
    }
  }
})
</script>

<style scoped>

</style>
