<template>
  <q-select
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :options="options"
    label-color="white"
    dense
    outlined
    :label="$t(type)"
    options-selected-class="text-deep-orange"
    emit-value
    map-options
    popup-content-class="bg-primary"
  >
    <template v-slot:prepend>
      <q-icon class="q-ml-sm" name="transgenders" />
    </template>
  </q-select>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useI18n} from 'vue-i18n';

export default defineComponent({
  name: 'UserSelect',
  props: {
    modelValue: Number,
    type: {
      type: String,
      default: 'gender'
    }
  },
  emits: ['update:modelValue'],
  setup(props) {
    const { tm } = useI18n();
    return {
      options: (tm(props.type + 's') as string[]).map((label, value) => ({ value, label }))
    }
  }
})
</script>

<style scoped>

</style>
