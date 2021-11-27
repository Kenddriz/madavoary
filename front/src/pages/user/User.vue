<template>
  <q-page class="bg-dark row">
    <div class="col-md-6 col-sm-12 q-pa-sm">
      <q-table
        bordered
        flat
        :style="`max-height:${$q.screen.height - 70}px`"
        table-class="sticky-header-table"
        v-model:pagination="pagination"
        :rows="user.items"
        :columns="columns"
        row-key="id"
        :no-data-label="$t('no-data')"
        selection="multiple"
        v-model:selected="selected"
        :loading="loading"
        :rows-per-page-options="[]"
        @request="searchUser"
      >
        <template v-slot:top>
          <div class="row q-gutter-y-sm full-width">
            <q-input
              :model-value="input.keyword"
              v-model="input.keyword"
              rounded
              outlined
              dense
              label="Chercher ..."
              label-color="white"
              @keypress.enter="searchUser"
              spellcheck="false"
              class="full-width"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <div class="q-gutter-sm flex justify-between col-12">
              <q-checkbox
                :model-value="index"
                v-for="(flt, index) in filters"
                :key="index"
                v-model="checkboxes"
                :val="index"
                :label="$t(`dashboard.user.${flt}`)"
                color="orange"
                @click="setFilter(index)"
              />
              <q-checkbox
                :model-value="index + 3"
                v-for="(role, index) in $tm('roles')"
                :key="index"
                v-model="checkboxes"
                :val="index + 3"
                :label="role"
                color="orange"
                @update:model-value="setFilter(index + 3)"
              />
            </div>
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
                @click="updateParams(props.row)"
              />
              <q-btn dense flat color="brown" text-color="white" icon="delete_forever"/>
              <q-btn
                dense
                flat
                color="brown"
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
      <UserDetails v-if="selected.length" :user="selected[0]" />
      <NoData :total-items="selected.length" :loading="false" />
    </div>
  </q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import UserDetails from 'components/user/UserDetails.vue';
import NoData from 'components/shared/NoData.vue';
import {User} from 'src/graphql/types';
import {usePaginateUsers} from 'src/graphql/user/paginate.user';
import EditUserParams from 'components/user/update/EditUserParams.vue';
import {useQuasar} from 'quasar';

const columns = [
  {name: 'firstName', align: 'left', field: (row: User) => row.firstName},
  {name: 'phone', align: 'left', field: (row: User) => row.phone },
  {name: 'controls', align: 'left'},
];
export default defineComponent({
  name: 'User',
  components: { UserDetails, NoData },
  setup() {
    const { dialog } = useQuasar();
    return {
      columns,
      ...usePaginateUsers(),
      filters: ['all','verifiedAt', 'disabled'],
      updateParams: (user: User) => dialog({
        component: EditUserParams,
        componentProps: { user }
      })
    }
  }
})
</script>

<style scoped>

</style>
