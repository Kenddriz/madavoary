<template>
  <q-card flat bordered class="bg-transparent q-pa-md">
    <apexchart
      type="area"
      height="326"
      :options="chartOptions"
      :series="series"
    />
  </q-card>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import {useQuery} from '@vue/apollo-composable';
  import  { gql } from '@apollo/client';
  import { NumeralOption } from 'src/graphql/types';
  import {useI18n} from 'vue-i18n';

  type VisitsMonthlyData = {
    visitsMonthly: NumeralOption[];
  }
  const QUERY = gql`
    query VisitsMonthly {
      visitsMonthly{ label value }
    }
  `;
  export default defineComponent({
  name: 'VisitsMonthly',
    setup() {
      const { loading, onResult } = useQuery<VisitsMonthlyData>(QUERY, { }, { fetchPolicy: 'no-cache' });
      const series = ref([{
        name: 'Active users',
        data: new Array(12).fill(0)
      }],)
      onResult(({ data }) => {
        series.value[0].data = new Array(12).fill(0);
        if (data) {
          data.visitsMonthly.forEach(cm => {
            series.value[0].data[cm.label - 1] = cm.value;
          })
        }
      });
      const { tm } = useI18n();
      return {
        series,
        loading,
        chartOptions: {
          animations: {
            enabled: true,
              easing: 'easeinout',
              speed: 1000
          },
          fill: {
            gradient: {
              shade: 'dark',
                type: 'vertical',
                shadeIntensity: 0.5,
                gradientToColors: ['#17ead9'],
                inverseColors: false,
                opacityFrom: 0.9,
                opacityTo: 0.7,
                stops: [0, 100]
            }
          },
          dataLabels: {
            enabled: false
          },
          title: {
            text: 'Répresentation des visites',
              align: 'left',
              style: {
              color: '#FFF'
            }
          },
          xaxis: {
            categories: tm('monthNamesShort'),
              labels: {
              style: {
                colors: '#fff'
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                colors: '#fff'
              }
            }
          }
        }
      }
    },
  })
</script>

<style>

</style>
