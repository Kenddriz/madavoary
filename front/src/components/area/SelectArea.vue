<template>
  <q-table
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
        dense color="primary"
        v-model="filter"
        outlined
        class="col-12"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

  </q-table>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useAreas} from 'src/graphql/area/areas';

export default defineComponent({
  name: 'SelectArea',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup() {
    return {
      ...useAreas(),
      filter: ref(''),
      columns: [{
        name: 'name',
        align: 'left',
        field: 'name',
      }]
    }
  },
  watch: {
    selected: {
      immediate: true,
      handler(val: any[]) { this.$emit('update:modelValue', val) }
    }
  }
})
</script>

<style scoped>

</style>
