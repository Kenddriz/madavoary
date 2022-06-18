<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-md">
      <Counter />
    </div>
    <div class="row q-col-gutter-md q-mt-xs">
      <div class="col-12 col-md-5">
        <RevenueMonthly />
      </div>

      <div class="col-12 col-md-2">
        <q-card square flat bordered class="bg-transparent">
          <q-card-section class="text-center bordered-bottom">
            Top visiteurs de l'année
          </q-card-section>
          <q-card-section class="q-pt-lg">
            <div
              v-for="(country, index) in 5"
              :key="country"
              class="q-mb-md"
            >
              <div class="flex justify-between">
                <label>Nom pays</label>
                <label>45</label>
              </div>
              <q-linear-progress
                rounded
                :value="country/5"
                :color="colors[index]"
                class="q-mt-xs"
              />
            </div>
          </q-card-section>

        </q-card>
      </div>

      <div class="col-12 col-md-5">
        <ApexBarChartsGrouped />
      </div>
    </div>
    <div class="row q-col-gutter-md q-mt-xs">
      <div class="col-12 col-md-6">
        <Revenue5LastYears />
      </div>
      <div class="col-12 col-md-6">
        <Visits5LastYears />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {menu} from 'pages/admin/data';
import RevenueMonthly from 'components/dashboard/RevenueMonthly.vue';
import Visits5LastYears from 'components/dashboard/VisitsMonthly.vue';
import Revenue5LastYears from 'components/dashboard/Revenue5LastYears.vue';
import ApexBarChartsGrouped from 'components/dashboard/DonVSPurchase.vue';
import Counter from 'components/dashboard/Counter.vue';

export default defineComponent({
  name: 'dashboard-dashboard',
  components: {
    Counter,
    RevenueMonthly,
    Revenue5LastYears,
    Visits5LastYears,
    ApexBarChartsGrouped
  },
  setup() {
    return {
      menu: menu.slice(3),
      colors: ['orange', 'red', 'positive', 'deep-orange', 'warning'],
    };
  }
});
</script>

<style>
</style>
