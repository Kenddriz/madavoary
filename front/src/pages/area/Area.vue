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
          :bordered="areas.length > 0"
          flat
          :style="`max-height:${$q.screen.height - 105}px`"
          table-class="sticky-header-table"
          v-model:pagination="pagination"
          :rows="areas"
          :columns="columns"
          row-key="id"
          :no-data-label="$t('no-data')"
          selection="single"
          v-model:selected="selected"
          :loading="loading"
          :rows-per-page-options="[10, 20]"
          :filter="filter"
          @update:selected=" tab = 'detail'"
        >
          <template v-slot:top>
            <q-input
              rounded
              outlined
              dense
              debounce="300"
              label="Chercher ..."
              label-color="white"
              :model-value="filter"
              v-model="filter"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-space />
            <q-btn
              class="q-ml-md"
              no-caps
              rounded
              outline
              icon="add"
              label="Nouvelle"
              @click="openForm()"
            />
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
                <q-btn
                  dense
                  flat
                  color="brown"
                  text-color="white"
                  icon="edit"
                  @click="openForm(props.row)"
                />
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
        <AreaDetails
          v-if="selected.length"
          :area="selected[0]"
          @back="tab = 'table'"
        />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import AreaDetails from 'components/area/AreaDetails.vue';
import {useQuasar} from 'quasar';
import AreaForm from 'components/area/AreaForm.vue';
import {useAreas} from 'src/graphql/area/areas';
import {Area} from 'src/graphql/types';

const columns = [
  {name: 'name', align: 'left', field: 'name'},
  {name: 'surface', align: 'left', field: (row: Area) => row.surface + 'ha'},
  {name: 'controls', align: 'left'},
];
export default defineComponent({
  name: 'Area',
  components: { AreaDetails },
  setup() {
    const { dialog } = useQuasar();
    return {
      openForm: (area = undefined) => {
        dialog({
          component: AreaForm,
          componentProps: { area }
        })
      },
      ...useAreas(),
      columns,
      tab: ref<string>('table')
    }
  }
})
</script>

<style scoped>

</style>
