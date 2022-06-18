<template>
  <div
    v-for="(m, index) in menu"
    :key="index"
    class="col-12 col-md-2"
  >
    <q-card
      flat
      bordered
      class="bg-transparent"
    >
      <q-card-section class="q-pb-none">
        {{ $t(m.label)}}
      </q-card-section>
      <q-card-section class="q-py-none text-center text-h6">
        {{ counts[index] }}
      </q-card-section>
      <q-card-actions class="q-pt-none" align="between">
        <router-link
          class="text-orange no-text-decoration q-pl-sm"
          :to="`/private/${m.to}`"
        >
          Tout voir
        </router-link>
        <q-avatar square size="md" color="positive" :icon="m.icon" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import {menu} from 'pages/admin/data';
  import { gql } from '@apollo/client';
  import {useQuery, useResult} from '@vue/apollo-composable';

  const QUERY = gql`
    query DashboardCounter {
      dashboardCounter
    }
  `;
  type DashboardCounterData = {
    dashboardCounter: number[];
  }
  export default defineComponent({
    name: 'Counter',
    setup() {
      const { loading, result } = useQuery<DashboardCounterData>(QUERY);
      const defaultCounts = new Array(5).fill(0);
      const counts = useResult(result, defaultCounts, res => res.dashboardCounter);
        return {
          menu: menu.slice(3),
          counts,
          loading,
        }
    }
  })
</script>

<style scoped>

</style>
