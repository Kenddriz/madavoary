<template>
  <q-table
    grid
    title="Tous êtres vivants"
    :rows="data"
    :columns="columns"
    row-key="name"
    :filter="filter"
    grid-header
    hide-header
    card-container-class="flex overflow-auto q-gutter-sm items-start wrap q-pa-sm"
    style="height: calc(100vh - 90px)"
  >
    <template v-slot:top-right>
      <q-input dense debounce="300" v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template  v-slot:item="props">
      <q-card flat bordered class="bg-primary">
        <q-card-section>
          {{props.row.name}}
        </q-card-section>
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
    <q-btn to="/living-being/creation" round color="deep-orange" icon="add" />
  </q-page-sticky>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  export default defineComponent({
    name: 'living-being-list',
    setup() {
      return {
        filter: ref(''),
        columns: [
          {
            name: 'desc',
            required: true,
            label: 'Dessert (100g serving)',
            align: 'left',
            field: (row: any) => row.name,
            format: (val: any) => `${val}`,
            sortable: true
          },
          { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
          { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
          { name: 'carbs', label: 'Carbs (g)', field: 'carbs' }
        ],
        data: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65
          }
        ]
      }
    }
  })
</script>

<style scoped>

</style>
