<template>
  <q-page class="bg-dark">
    <q-tab-panels
      model-value="table"
      v-model="tab"
      keep-alive
      animated
    >
      <q-tab-panel name="table" class="q-pa-sm">
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
          @update:selected="tab = 'detail'"
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
            <q-btn unelevated label="Nouveau" icon="add" @click="tab = 'create'" />
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
                <q-btn
                  dense
                  flat
                  text-color="white"
                  icon="read_more"
                  @click="props.selected = true;"
                />
              </q-btn-group>
            </q-td>
          </template>
          <template v-slot:loading>
            <q-linear-progress indeterminate color="warning" />
          </template>
        </q-table>
      </q-tab-panel>
      <q-tab-panel name="detail" class="q-pa-sm">
        <SpeciesDetails
          v-if="selected.length"
          :item="selected[0]"
          @back="tab = 'table'"
        />
      </q-tab-panel>
      <q-tab-panel name="create" class="q-pa-sm">
        <CreateLivingBeingForm />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import SpeciesDetails from 'components/living-being/LivingBeingDetails.vue';
import {usePaginateLivingBeings} from 'src/graphql/living-being/paginate-living-beings';
import {LivingBeing} from 'src/graphql/types';
import CreateLivingBeingForm from 'components/living-being/CreateLivingBeingForm.vue';

const columns = [
  {name: 'localNames', align: 'left', field: (row: LivingBeing) => row.localNames.join('/')},
  {name: 'scientificName', align: 'left', field: (row: LivingBeing) => row.names[0] },
  {name: 'controls', align: 'left'},
];
export default defineComponent({
  name: 'LivingBeing',
  components: { SpeciesDetails, CreateLivingBeingForm },
  setup() {
    return {
      columns,
      ...usePaginateLivingBeings(0, true),
      tab: ref<string>('table')
    }
  }
})
</script>

<style scoped>

</style>
