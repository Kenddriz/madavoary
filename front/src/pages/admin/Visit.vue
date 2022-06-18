<template>
  <q-table
    class="my-sticky-dynamic bg-transparent q-mx-md"
    flat
    title="Visites du site"
    :filter="pagination.keyword"
    :rows="visit.items"
    :columns="columns"
    :loading="loading"
    row-key="index"
    v-model:pagination="pagination"
    :rows-per-page-options="[10, 20, 30, 50]"
    rows-per-page-label="Visites par page"
    @request="onRequest"
    binary-state-sort
  >
    <template v-slot:top-right>
      <q-input
        dense
        v-model="pagination.keyword"
        :model-value="pagination.keyword"
        :placeholder="$t('search')"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

    <template #no-data>
      <div class="full-width flex justify-end">
        <q-pagination
          v-model="pagination.page"
          color="orange"
          :model-value="pagination.page"
          :max="visit.meta.totalPages"
          @update:model-value="onRequest()"
          input
          input-class="text-orange"
        />
      </div>
    </template>
    <template #bottom>
      <div class="full-width flex justify-end">
        <q-pagination
          v-model="pagination.page"
          color="orange"
          :model-value="pagination.page"
          :max="visit.meta.totalPages"
          @update:model-value="onRequest()"
          input
          input-class="text-orange"
        />
      </div>
    </template>
  </q-table>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import {usePaginateVisits} from 'src/graphql/visit/paginate-visits';
  import {paginationLabel} from 'src/graphql/utils/pagination';

  export default defineComponent({
    setup(){
      return {
        ...usePaginateVisits(),
        paginationLabel,
      }
    },
  })
</script>
<style lang="sass">
  .my-sticky-dynamic
    /* height or max-height is important */
    height: calc(100vh - 88px)

    .q-table__top, .q-table__bottom, thead tr:first-child th /* bg color is important for th; just specify one */
      background-color: #1b2a47

    thead tr th
      position: sticky
      z-index: 1
    /* this will be the loading indicator */
    thead tr:last-child th
      /* height of all previous header rows */
      top: 48px
    thead tr:first-child th
      top: 0
</style>
