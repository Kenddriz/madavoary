<template>
  <q-table
    grid
    title="Tous êtres vivants"
    :rows="livingBeing.items"
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
        :model-value="filter"
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
        flat bordered
        class="bg-primary cursor-pointer"
        @click="$router.push(`/living-beings/update/${props.row.id}`)"
        v-ripple
      >
        <q-card-section>
          <q-img
            :src="getImage(props.row.images[1], `livingBeings/`)"
            basic
            height="150px"
          >
            <div class="absolute-center text-h6">
              {{ props.row.names[0] }}
            </div>
          </q-img>
        </q-card-section>
        <q-separator />
        <q-list dense>
          <q-item v-for="(col, index) in props.cols" :key="index">
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
    <q-btn to="/living-beings/creation" round color="deep-orange" icon="add" />
  </q-page-sticky>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import {usePaginateLivingBeings} from 'src/graphql/living-being/paginate-living-beings';
  import {getImage} from 'src/graphql/utils/utils';
  import {paginationLabel} from 'src/graphql/utils/pagination';

  export default defineComponent({
    name: 'living-being-list',
    setup() {
      return {
        filter: ref(''),
        ...usePaginateLivingBeings(),
        paginationLabel,
        getImage,
      }
    }
  })
</script>

<style scoped>

</style>
