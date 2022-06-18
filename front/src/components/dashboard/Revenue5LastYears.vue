<template>
  <q-card flat bordered class="bg-transparent">
    <q-card-section class="text-center bordered-bottom">
      Chiffres d'affaires
    </q-card-section>
    <q-card-section>
      <q-markup-table
        wrap-cells
        separator="none"
        flat
        class="bg-transparent"
      >
        <thead>
        <tr>
          <th class="text-left">Année</th>
          <th class="text-center">Dons</th>
          <th class="text-center">Achat</th>
          <th class="text-right">Total</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(rev, index) in revenues" :key="index" class="q-tr--no-hove">
          <td class="text-left">{{rev.year}}</td>
          <td class="text-center">{{ rev.give }}</td>
          <td class="text-center">{{ rev.purchase }}</td>
          <td class="text-right">{{ rev.give + rev.purchase }}</td>
        </tr>
        </tbody>
      </q-markup-table>
    </q-card-section>

  </q-card>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { gql } from '@apollo/client';
  import { useQuery } from '@vue/apollo-composable';
  import {Revenue5LastYears} from 'src/graphql/types';

  type Revenue5LastYearsData = {
    revenue5LastYears: Revenue5LastYears[];
  }
  const QUERY = gql`
    query Revenue5LastYears {
      revenue5LastYears {
        year
        amount
        type
      }
    }
  `;
  export default defineComponent({
    name: 'Revenue5LastYears',
    setup() {
      const { loading, onResult } = useQuery<Revenue5LastYearsData>(QUERY);
      const year = new Date().getFullYear();
      const defaultData = [0, 1, 2, 3, 4].map(x => ({ year: year - x, give: 0, purchase: 0 }));
      const revenues = ref(defaultData);
      onResult(({ data }) => {
        revenues.value = [...defaultData];
        const response = data?.revenue5LastYears;
        if(response) {
          response.forEach(val => {
            const found = revenues.value.find(d => d.year === val.year);
            if(found) {
              if(val.type === 0) found.give = val.amount;
              else found.purchase = val.amount;
            }
          })
        }
      })
      return {
        loading,
        revenues,
      }
    }
  })
</script>

<style scoped>

</style>
