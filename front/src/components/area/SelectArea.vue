<template>
  <!--<q-table
    dense
    :rows="areas"
    :columns="columns"
    row-key="id"
    :filter="filter"
    :loading="loading"
    :no-data-label="$t('no-data')"
    selection="single"
    v-model:selected="selected"
    v-model:pagination="pagination"
    @update:selected="$emit('update:modelValue', $event)"
    hide-header
    hide-selected-banner
  >

    <template v-slot:top>
      <q-input
        :model-value="filter"
        dense
        color="white"
        v-model="filter"
        outlined
        class="col-12"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

  </q-table>-->
  <q-select
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    use-input
    label="Parcs où l'on trouve"
    :options="options"
    @filter="filterFn"
    label-color="white"
    multiple
    popup-content-class="bg-primary"
    options-selected-class="text-warning"
    options-dense
    :hide-dropdown-icon="true"
    class="full-width"
    dense
    :loading="loading"
    hide-selected
  >
    <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
      <q-item v-bind="itemProps">
        <q-item-section>
          <q-item-label v-html="opt.label" />
        </q-item-section>
        <q-item-section side>
          <q-toggle
            :model-value="selected"
            @update:model-value="toggleOption(opt)"
            color="warning"
          />
        </q-item-section>
      </q-item>
    </template>
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import {useAreas} from 'src/graphql/area/areas';

export default defineComponent({
  name: 'SelectArea',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup() {
    const {areas, loading} = useAreas();
    const defaultAreas = computed(() => areas.value.map(a => ({
      label: a.name,
      value: a.id
    })));
    const options = ref([...defaultAreas.value]);
    return {
      options,
      loading,
      filterFn(val: string, update: any) {
        if (val === '') {
          update(() => {
            options.value = defaultAreas.value;
          })
          return
        }
        update(() => {
          const needle = val.toLowerCase()
          options.value = defaultAreas.value.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
        })
      }
    }
  }
})
</script>

<style scoped>

</style>
