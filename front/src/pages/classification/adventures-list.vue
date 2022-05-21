<template>
  <q-table
    grid
    title="Tous mes aventures"
    :rows="adventure.items"
    :columns="columns"
    row-key="id"
    :filter="pagination.keyword"
    grid-header
    hide-header
    card-container-class="flex overflow-auto q-gutter-sm items-start wrap q-pa-sm"
    style="height: calc(100vh - 90px)"
    :pagination-label="paginationLabel"
    rows-per-page-label="Aventures par page"
    v-model:pagination="pagination"
    @request="onRequest"
    :loading="loading"
    binary-state-sort
    :rows-per-page-options="[10, 20, 30, 50]"
  >
    <template v-slot:top-right>
      <q-input
        color="orange"
        dense
        v-model="filter"
        @keyup.enter="pagination.keyword = filter"
        placeholder="Search"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template  v-slot:item="props">
      <q-card
        flat
        bordered
        class="bg-primary cursor-pointer"
        v-ripple
        @click="$router.push(`/adventures/update/${props.row.id}`)"
      >
        <q-img
          :src="getImage(props.row.images[0], `adventures/${props.row.natureId}`)"
          basic
          height="150px"
        >
          <div class="absolute-center text-h6">
            {{ props.row.naming }}
          </div>
        </q-img>
        <q-separator />
        <q-list dense>
          <q-item v-for="col in props.cols" :key="col.name">
            <q-item-section>
              <q-item-label>{{ col.label }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption>{{ col.value }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </template>
  </q-table>
  <q-page-sticky position="bottom-left" :offset="[18, 18]">
    <q-btn
      no-caps
      to="/adventures/creation"
      label="Nouvel aventure"
      color="secondary"
      icon="add"
    />
  </q-page-sticky>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import {useAdventuresList} from 'src/graphql/adventure/adventures-list';
  import {getImage} from 'src/graphql/utils/utils';
  import {paginationLabel} from 'src/graphql/utils/pagination';

  export default defineComponent({
    name: 'adventures-creation',
    setup() {
      return {
        ...useAdventuresList(),
        paginationLabel,
        getImage,
      }
    }
  })
</script>

<style scoped>

</style>
