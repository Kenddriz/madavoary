<template>
  <div class="col-md-6 col-sm-12 q-pa-sm">
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
      :loading="false"
      :rows-per-page-options="[10, 20]"
    >
      <template v-slot:top>
        <div class="flex flex-center q-gutter-md full-width">
          <q-input
            rounded
            outlined
            dense
            debounce="300"
            label="Chercher ..."
            label-color="white"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn
            no-caps
            rounded
            outline
            icon="add"
            label="Nouvelle"
            @click="openForm()"
          />
        </div>
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
              @click="props.selected = true"
            />
          </q-btn-group>
        </q-td>
      </template>
      <template v-slot:loading>
        <q-linear-progress indeterminate color="warning" />
      </template>
    </q-table>
  </div>
  <div class="col-md-6 col-sm-12 q-pa-sm">
    <AreaDetails v-if="selected.length" :area="selected[0]" />
    <NoData v-else :total-items="0" :loading="false" />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AreaDetails from './AreaDetails.vue';
import {useQuasar} from 'quasar';
import AreaForm from 'components/area/AreaForm.vue';
import {useAreas} from 'src/graphql/area/areas';
import {Area} from 'src/graphql/types';
import NoData from 'components/shared/NoData.vue';

const columns = [
  {name: 'name', align: 'left', field: 'name'},
  {name: 'surface', align: 'left', field: (row: Area) => row.surface + 'ha'},
  {name: 'controls', align: 'left'},
];
export default defineComponent({
  name: 'Area',
  components: { AreaDetails, NoData },
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
      columns
    }
  }
})
</script>

<style scoped>

</style>
