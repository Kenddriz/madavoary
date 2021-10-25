<template>
  <q-table
    bordered
    flat
    :style="`max-height:${$q.screen.height - 70}px`"
    table-class="sticky-header-table"
    v-model:pagination="pagination"
    :rows="rows"
    :columns="columns"
    row-key="phone"
    :no-data-label="$t('no-data')"
    selection="multiple"
    v-model:selected="selected"
    :loading="false"
    :rows-per-page-options="[]"
  >
    <template v-slot:top>
      <div class="row wrap justify-around q-gutter-y-sm full-width">
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
        <q-btn-group outline>
          <q-btn outline color="brown" text-color="white" icon="edit" />
          <q-btn outline color="brown" text-color="white" icon="delete_forever"/>
          <q-btn outline color="brown" text-color="white" icon="read_more" />
          <q-btn outline color="brown" text-color="white" icon="add" />
        </q-btn-group>
      </div>
    </template>
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th class="bg-primary">
          <q-radio
            :val="true"
            :model-value="props.selected"
            @click="props.selected = !props.selected"
            color="amber"
          />
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
</template>

<script>
import {defineComponent, ref} from 'vue';
import {useQuasar} from 'quasar';
const columns = [
  {name: 'lastName', align: 'left', field: 'lastName'},
  {name: 'phone', align: 'left', field: 'phone'},
  {name: 'controls', align: 'left'},
];
const rows = [
  {id: 1, lastName: 'Hajisy', firstName: 'Charlin', phone: '0340209781'},
  {id: 2, lastName: 'Kasimo', firstName: 'Kenddrick', phone: '0330209481'},
  {id: 3, lastName: 'Hajisy', firstName: 'Kenddriz', phone: '0340209761'},
  {id: 3, lastName: 'Nazumy', firstName: 'Milot', phone: '0320209789'},
  {id: 4, lastName: 'Hajisy', firstName: 'Charlin', phone: '0340209786'},
  {id: 5, lastName: 'Kasimo', firstName: 'Kenddrick', phone: '0330209487'},
  {id: 6, lastName: 'Hajisy', firstName: 'Kenddriz', phone: '0340209768'},
  {id: 7, lastName: 'Nazumy', firstName: 'Milot', phone: '0320209780'}
]
export default defineComponent({
  name: 'UsersTable',
  setup() {
    const { screen } = useQuasar();
    const pagination = ref({
      sortBy: 'asc',
      descending: false,
      page: 1,
      rowsPerPage: Math.ceil((screen.height - 80)/60),
      rowsNumber: 8
    })
    return {
      pagination,
      columns,
      selected: ref([]),
      rows
    }
  }
})
</script>

<style scoped>

</style>
