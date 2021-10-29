<template>
  <q-page class="row bg-dark">
    <div class="col-md-6 col-sm-12 q-pa-sm">
      <q-table
        bordered
        flat
        :style="`max-height:${$q.screen.height - 70}px`"
        table-class="sticky-header-table"
        v-model:pagination="pagination"
        :rows="collection.items"
        :columns="columns"
        row-key="id"
        :no-data-label="$t('no-data')"
        selection="single"
        v-model:selected="selected"
        :loading="loading"
        :rows-per-page-options="[]"
        @request="submitSearch"
      >
        <template v-slot:top>
          <div class="row wrap justify-between q-gutter-y-sm full-width">
            <q-input
              rounded
              outlined
              dense
              debounce="300"
              label="Chercher ..."
              label-color="white"
              :model-value="pagination.keyword"
              v-model="pagination.keyword"
              @keydown.enter="submitSearch"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <CreateCollection />
            <CollectionSubjects
              v-model="pagination.natureId"
              @update:model-value="submitSearch"
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
            v-model="scope.selected"
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
                @click="update(props.row)"
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
      <CollectionDetails :collection="selected[0]" />
    </div>
  </q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import CollectionDetails from 'components/collection/CollectionDetails.vue';
import CreateCollection from 'components/collection/CreateCollection.vue';
import CollectionSubjects from 'components/collection/CollectionSubjects.vue';
import {usePaginateCollections} from 'src/graphql/collection/paginate-collections';
import UpdateCollection from 'components/collection/UpdateCollection.vue';
import {useQuasar} from 'quasar';
import {Collection} from 'src/graphql/types';
const columns = [
  {name: 'naming', align: 'left', field: 'naming'},
  {name: 'place', align: 'left', field: 'place'},
  {name: 'controls', align: 'left'},
];
export default defineComponent({
  name: 'Collection',
  components: { CreateCollection, CollectionSubjects, CollectionDetails },
  setup() {
    const { dialog } = useQuasar();
    return {
      ...usePaginateCollections(Number(localStorage.getItem('id'))),
      columns,
      update: (collection: Collection) => {
        dialog({
          component: UpdateCollection,
          componentProps: { collection }
        })
      }
    }
  }
})
</script>

<style scoped>

</style>
