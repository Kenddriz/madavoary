<template>
  <q-table
    grid
    card-container-class="flex wrap overflow-auto q-mt-xs q-pa-sm"
    :rows="areas"
    :columns="columns"
    row-key="id"
    :no-data-label="$t('no-data')"
    :filter="filter"
    hide-header
    style="height: calc(100vh - 90px)"
  >
    <template v-slot:top-left>
      <q-input
        :model-value="filter"
        dense
        v-model="filter"
        placeholder="Chercher"
        label-color="color"
        color="white"
      >
        <template v-slot:append>
          <q-icon color="white" name="search" />
        </template>
      </q-input>
    </template>

    <template v-slot:top-right>
      <q-btn
        no-caps
        flat
        icon="add"
        label="Nouvelle"
        to="/areas/create"
      />
    </template>

    <template v-slot:item="props">
      <q-img
        @click="$router.push(`/areas/update/${props.row.id}`)"
        style="height: 140px; max-width: 150px"
        :src="getImage(props.row.banner)"
        class="q-ma-xs q-card--bordered cursor-pointer"
        v-ripple
      >
        <div class="absolute-full text-subtitle2 flex flex-center items-center">
          <div>
            {{ props.row.name }}<br>
            <small class="flex flex-center q-mb-md">
              {{ props.row.surface }} ha
            </small>
          </div>
        </div>
      </q-img>
    </template>
  </q-table>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import {useAreas} from 'src/graphql/area/areas';
  import {getImage} from 'src/graphql/utils/utils';
  import {Area} from 'src/graphql/types';

  export default defineComponent({
    name: 'areas-list',
    setup() {
      return {
        ...useAreas(),
        getImage,
        columns: [
          {name: 'name', align: 'left', field: 'name'},
          {name: 'surface', align: 'left', field: (row: Area) => row.surface + 'ha'},
        ],
      }
    }
  })
</script>

<style scoped>

</style>
