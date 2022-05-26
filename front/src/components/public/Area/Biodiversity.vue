<template>
  <q-card class="bg-secondary" flat>
    <q-card-section class="text-h5 text-center">
      {{ $tm(`parks.${page}.biodiversity.title`) }}
    </q-card-section>

    <q-separator inset />

    <q-card-section class="row justify-center">
      <q-card
        class="bg-primary q-ma-sm"
        flat
        square
        bordered
        v-for="(bio, index) in $tm(`parks.${page}.biodiversity.body`)"
        :key="index"
        style="max-width: 500px"
      >
        <q-card-section>{{ bio.title }}</q-card-section>

        <q-separator inset />

        <q-card-section>
          <q-list v-if="index === 0">
            <q-item v-for="(desc, i) in bio.descriptions" :key="i">
              <q-item-section avatar>
                <q-icon name="format_list_bulleted" />
              </q-item-section>
              <q-item-section>{{ desc }}</q-item-section>
            </q-item>
          </q-list>
          <apexchart
            width="350"
            v-else
            type="donut"
            :options="chart(bio.descriptions)"
            :series="chart(bio.descriptions, 'series')"
          />
        </q-card-section>
      </q-card>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import {cloneDeep} from 'src/graphql/utils/utils';
  import {donutOptions} from 'src/graphql/shared/chart';

  export default defineComponent({
    name: 'Biodiversity',
    props: {
      page: String
    },
    setup() {
      const chart = (dat: string, type = 'opt') => {
        const data = JSON.parse(dat) as Array<{kind: string, count: number}>;
        if(type === 'opt') {
          const opt: any = cloneDeep(donutOptions);
          opt.labels = data.map(d => d.kind);
          opt.legend.position = 'bottom';
          opt.legend.horizontalAlign = 'left';
          return opt
        }
        return data.map(d => d.count);
      };
      return {
        chart
      }
    }
  });
</script>

<style lang="scss" scoped>
  ::v-deep(.apexcharts-legend-text) {
    color: white !important;
  }
</style>
