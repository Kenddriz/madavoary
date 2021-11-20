<template>
  <q-page class="row bg-dark">
    <div class="col-md-6 col-sm-12 q-pa-sm">
      <q-table
        bordered
        flat
        :style="`max-height:${$q.screen.height - 105}px`"
        table-class="sticky-header-table"
        v-model:pagination="pagination"
        :rows="livingBeing.items"
        :columns="columns"
        row-key="id"
        :no-data-label="$t('no-data')"
        selection="single"
        v-model:selected="selected"
        :loading="loading"
        :rows-per-page-options="[5, 10]"
      >
        <template v-slot:top>
          <q-input
            rounded
            outlined
            dense
            debounce="300"
            label="Chercher ..."
            label-color="white"
            :model-value="pagination.keyword"
            v-model="pagination.keyword"
            @keyup.enter="submitSearch"
            spellcheck="false"
          >
            <template v-slot:after>
              <q-btn @click="submitSearch" rounded outline icon="search" />
            </template>
          </q-input>
          <q-space />
          <CreateLivingBeing />
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th class="bg-primary">
              Options
            </q-th>
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              class="bg-primary text-left"
            >
              {{ $t(col.name) }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body-selection="scope">
          <q-radio
            :val="true"
            :model-value="scope.selected"
            @click="scope.selected = !scope.selected"
            color="amber"
          />
        </template>
        <template v-slot:body-cell-controls="props">
          <q-td auto-width :props="props">
            <q-btn-group flat>
              <q-btn dense flat color="brown" text-color="white" icon="edit" />
              <q-btn dense flat color="brown" text-color="white" icon="delete_forever"/>
              <q-btn dense flat color="brown" text-color="white" icon="read_more" />
            </q-btn-group>
          </q-td>
        </template>
        <template v-slot:loading>
          <q-linear-progress indeterminate color="warning" />
        </template>
      </q-table>
    </div>
    <div class="col-md-6 col-sm-12 q-pa-sm">
      <SpeciesDetails
        v-if="selected.length"
        :item="selected[0]"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import SpeciesDetails from 'components/living-being/LivingBeingDetails.vue';
import {usePaginateLivingBeings} from 'src/graphql/living-being/paginate-living-beings';
import {LivingBeing} from 'src/graphql/types';
import CreateLivingBeing from 'components/living-being/CreateLivingBeing.vue';

const columns = [
  {name: 'localNames', align: 'left', field: (row: LivingBeing) => row.localNames.join('/')},
  {name: 'controls', align: 'left'},
];
export default defineComponent({
  name: 'LivingBeing',
  components: { SpeciesDetails, CreateLivingBeing },
  setup() {
    return {
      columns,
      ...usePaginateLivingBeings(0, true)
    }
  }
})
</script>

<style scoped>

</style>
