<template>
  <q-layout view="hhh lpR fff">

    <q-header class="header">
      <q-img
        :src="getImage(currentArea?.banner)"
        style="height: 45vh"
      >
        <div class="absolute-top-left bg-transparent">
          <q-btn
            round
            flat
            icon="keyboard_arrow_left"
            class="WAL__drawer-open q-mr-sm"
            @click="left = !left"
          />
        </div>
        <div v-if="currentArea" class="absolute-center text-center">
          <div class="text-h4 text-uppercase">{{ currentArea.name }}</div>
          <span class="text-caption text-orange">
            « {{ currentArea.slogans[1] }} »
          </span>
        </div>
      </q-img>
    </q-header>

    <q-drawer
      v-model="left"
      show-if-above
      :breakpoint="690"
      side="left"
    >
      <q-toolbar>
        <q-toolbar-title>Détails</q-toolbar-title>
        <q-space />
        <q-btn
          round
          flat
          icon="close"
          class="WAL__drawer-close"
          @click="left = false"
        />
      </q-toolbar>

      <q-scroll-area v-if="currentArea" style="height: calc(100% - 108px)">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label caption>
                {{$t('area.type')}}
              </q-item-label>
              <q-item-label>
                {{ $tm('area.longTypes')[currentArea.type] }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Région
              </q-item-label>
              <q-item-label>
                {{ currentArea.region }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Superficie
              </q-item-label>
              <q-item-label>
                {{ currentArea.surface }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Coordonnées Géographiques
              </q-item-label>
              <q-item-label>
                {{ currentArea.geo.x }}° Est   {{ currentArea.geo.y }}°Ouest
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-separator :inset="true" />
        <div style="height: 250px" class="text-center">Map</div>
        <q-separator :inset="true" />
        <div class="text-center">
          {{ currentArea.descriptions[0] }}
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page class="bg-secondary q-pa-md" style="height: 100vh">
        <div class="text-subtitle1 q-mb-sm">
          Classification scientifique des êtres vivants
        </div>
        <Classifiers
          class="no-wrap scroll-x"
          v-model="filter.classifier"
          show-selected
        />
        <q-separator spaced="lg" />
        <q-table
          grid
          title="Etres vivants"
          :rows="livingBeings"
          :columns="columns"
          row-key="id"
          :filter="filter"
          :filter-method="filterMethod"
          card-container-class="flex overflow-auto q-gutter-sm items-start wrap q-pa-sm"
          style="height: calc(100vh - 90px)"
          :pagination-label="paginationLabel"
          rows-per-page-label="Aventures par page"
          :loading="loading"
          binary-state-sort
          :rows-per-page-options="[10, 20, 30, 50]"
        >
          <template v-slot:top-right>
            <q-input
              :model-value="filter.names"
              color="orange"
              dense
              v-model="filter.names"
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
              @click="$router.push(`/living-being-details/${props.row.id}`)"
              v-ripple
            >
              <q-card-section>
                <q-img
                  :src="getImage(props.row.images[1], `livingBeings/`)"
                  basic
                  height="150px"
                  width="150px"
                >
                  <div class="absolute-top text-body2 text-center">
                    {{ props.row.names[0] }}
                  </div>
                </q-img>
              </q-card-section>
            </q-card>
          </template>
        </q-table>
      </q-page>
    </q-page-container>

    <q-footer>
      <q-toolbar-title class="q-py-md q-mx-lg bordered-bottom">
        A visiter également
      </q-toolbar-title>
      <Areas :areas="areas" />
    </q-footer>

  </q-layout>
</template>

<script lang="ts">

  import {computed, defineComponent, ref, watch} from 'vue';
  import {useAreas} from 'src/graphql/area/areas';
  import {useRoute} from 'vue-router';
  import Areas from 'components/area/Areas.vue';
  import {getImage} from 'src/graphql/utils/utils';
  import Classifiers from 'components/classifier/classifiers.vue';
  import {defaultSelected} from 'src/graphql/classifier/classifiers';
  import {LivingBeing} from 'src/graphql/types';
  import {useFindLivingBeingByArea} from 'src/graphql/living-being/find-living-being-by-area';
  import {paginationLabel} from 'src/graphql/utils/pagination';

  export default defineComponent({
    name: 'AreaLayout',
    components: { Areas, Classifiers },
    setup() {
      const { loading, areas } = useAreas();
      const { loading: loadingLb, livingBeings, columns, loadData } = useFindLivingBeingByArea();
      const router = useRoute();

      const currentArea = computed(() => {
        const id = Number(router.params.id) || 1;
        return areas.value.find(a => a.id === id);
      });

      watch(() => router.params, (params) => {
        if(params.id)loadData(Number(params.id));
      }, { immediate: true });

      const filter = ref({
        names: '',
        classifier: { ...defaultSelected },
      });
      function filterMethod(rows: any, terms: any) {
        const cId = terms.classifier.id;
        if(cId !== null)
          rows =  rows.filter((lb: LivingBeing) => lb.classifiers.findIndex(c => c.id === cId) > -1);
        return terms.names? rows.filter((lb: LivingBeing) => lb.names[0].includes(terms.names)) : rows;
      }
      return {
        loading,
        areas,
        currentArea,
        left: ref(false),
        getImage,
        filterMethod,
        filter,
        loadingLb,
        livingBeings,
        columns,
        paginationLabel,
      }
    }
  })
</script>
<style lang="sass" scoped>
  .q-drawer--standard
    .WAL__drawer-close
      display: none
@media (min-width: 691px)
  .WAL__drawer-open
      display: none
</style>
