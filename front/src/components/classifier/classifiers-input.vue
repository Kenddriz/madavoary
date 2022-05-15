<template>
  <q-select
    color="orange"
    use-input
    hide-selected
    fill-input
    :options="options"
    @filter="filterFn"
    :model-value="modelValue"
    @input-value="$emit('update:modelValue', $event)"
    popup-content-class="bg-primary q-card--bordered"
    options-dense
    :hide-dropdown-icon="true"
    hide-bottom-space
    outlined
    dense
  />
</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref} from 'vue';
import {Classifier} from 'src/graphql/types';
export type Option = {
  label: string,
  value: number
}
export default defineComponent({
  name: 'ClassifiersInput',
  props: {
    items: {
      type: Array as PropType<Classifier[]>,
      required: true
    },
    modelValue: String
  },
  emits: ['update:modelValue'],
  setup(props){
    const defaultOptions = computed<Option[]>(() => props.items.map(c => ({ label: c.label, value: c.id })));
    const options = ref<Option[]>([...defaultOptions.value]);
    return{
      defaultOptions,
      options,
      filterFn (val: string, update: any) {
        update(() => {
          const needle = val.toLocaleLowerCase()
          options.value = defaultOptions.value.filter(v => v.label.toLocaleLowerCase().indexOf(needle) > -1)
        })
      },
    }
  }
})
</script>

<style scoped>

</style>
