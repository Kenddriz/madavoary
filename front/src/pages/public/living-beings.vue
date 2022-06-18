<template>
  <q-layout view="lhh lpR fff">

    <q-header class="bg-primary text-white">
      <q-toolbar style="height: 100px">
        <q-btn
          round
          flat
          icon="menu"
          class="WAL__drawer_open q-mt-md"
          @click="left = !left"
        />
        <q-toolbar-title class="text-uppercase text-center">
          Les êtres vivants de Madagascar
        </q-toolbar-title>
        <!--quick navigation-->
        <q-btn
          round
          flat
          icon="more_vert"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      :width="$q.screen.xs ? $q.screen.width : 330"
      show-if-above
      v-model="left"
      side="left"
      :breakpoint="694"
      bordered
    >
      <q-toolbar style="height: 100px" class="bg-secondary">
        <q-input
          v-model="pagination.keyword"
          :model-value="pagination.keyword"
          label="chercher ..."
          dark
          dense
          color="warning"
          @keyup.enter="submitSearch()"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-space />
        <q-btn
          round
          flat
          icon="close"
          color="deep-orange"
          class="WAL__drawer_close"
          @click="left = false"
        />
      </q-toolbar>

      <q-scroll-area class="q-pa-md" style="height: calc(100% - 100px);">
        <div class="q-mb-md">Filtrer par classifications scientifiques</div>
        <Classifiers show-selected v-model="classifier" />
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page class="bg-secondary q-pa-md">
        <div class="q-col-gutter-sm row" style="min-height: 70vh">
          <div
            v-for="(lb, index) in livingBeing.items"
            :key="index"
            class="col-12 col-md-2 col-lg-3 col-xl-1 cursor-pointer"
            @click="$router.push(`/living-being-details/${lb.id}`)"
          >
            <q-img
              style="min-height: 150px;"
              :src="getImage(lb.images[0], `livingBeings/`)"
              class="rounded-borders"
              v-ripple
            >
              <div class="absolute-full text-subtitle2 flex flex-center">
                {{ lb.names[0] }}
              </div>
            </q-img>
          </div>
        </div>
        <q-card flat bordered class="q-pa-sm flex flex-center q-mt-sm">
          <q-pagination
            v-model="pagination.page"
            :model-value="pagination.page"
            color="deep-orange"
            :max="10"
            :max-pages="livingBeing.meta.totalPages"
            boundary-numbers
            @update:model-value="submitSearch()"
          />
        </q-card>
      </q-page>
    </q-page-container>

    <Footer />

  </q-layout>
</template>

<script lang="ts">
  import {defineComponent, ref} from 'vue';
  import {getImage} from 'src/graphql/utils/utils';
  import Footer from 'layouts/public/Footer.vue';
  import Classifiers from 'components/classifier/classifiers.vue';
  import {defaultSelected} from 'src/graphql/classifier/classifiers';
  import {usePaginateLivingBeings} from 'src/graphql/living-being/living-beings-public';

  export default defineComponent({
    name: 'living-beings-public',
    components: { Footer, Classifiers },
    setup() {

      return {
        left: ref(false),
        getImage,
        classifier: ref({ ...defaultSelected }),
        ...usePaginateLivingBeings(),
      }
    }
  })
</script>
<style lang="sass">
  .WAL__drawer_open
    display: none
  .WAL__drawer_close
    display: none
  @media (max-width: 695px)
    .WAL__drawer_open
      display: block
    .WAL__drawer_close
      display: block
    .text-uppercase
      font-size: 12px
</style>
