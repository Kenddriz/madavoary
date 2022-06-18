<template>
  <q-layout view="lhh lpr fff">
    <q-header>
      <q-toolbar style="height: 100px">
        <q-btn
          round
          flat
          icon="menu"
          class="WAL__drawer_open q-mt-md"
          @click="left = !left"
        />
        <q-toolbar-title class="text-uppercase text-center">
          Les aventures de tout les temps à Madagascar
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="left"
      show-if-above
      :breakpoint="690"
      side="left"
    >
      <q-toolbar class="bg-secondary" style="height: 100px">
        <q-toolbar-title>Filtrage</q-toolbar-title>
        <q-space />
        <q-btn
          round
          flat
          icon="close"
          class="WAL__drawer_close q-mt-md"
          @click="left = false"
        />
      </q-toolbar>

      <q-scroll-area class="q-pa-md" style="height: calc(100% - 108px)">
        <q-input
          color="orange"
          label="Chercher"
          v-model="pagination.keyword"
          :model-value="pagination.keyword"
        />
        <q-separator :inset="true" />
        <div class="text-h6 q-mt-lg q-mb-md">
          Sujets d'aventures
        </div>
        <div class="column q-mb-lg">
          <q-checkbox
            :model-value="subject.id"
            v-model="pagination.natureIds"
            v-for="subject in $tm('adventure-subjects')"
            :key="subject.id"
            :val="Number(subject.id)"
            :label="subject.title"
            color="deep-orange"
            keep-color
          />
        </div>
        <q-btn
          outline
          dense
          rounded
          color="orange"
          icon="search"
          :label="$t('search')"
          no-caps
          class="q-px-lg"
          @click="submitSearch()"
          :loading="loading"
        />
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page class="bg-secondary q-pa-md">
        <div class="row" style="min-height: 70vh">
          <div
            v-for="(adv, index) in adventure.items"
            :key="index"
            class="cursor-pointer col-12 col-md-3 col-lg-2 q-pa-xs"
            @click="$router.push(`/adventure-details/${adv.id}`)"
          >
            <q-card
              flat
              bordered
              v-ripple
              class="fit"
            >
              <div class="subject">
                {{ $tm('adventure-subjects').find(s => s.id == adv.natureId).title }}
              </div>
              <q-img height="100px" :src="getImage(adv.images[0], `adventures/${adv.natureId}`)" />
              <q-card-section class="q-mb-lg">
                <div class="text-subtitle1">
                  {{ adv.naming  }}
                </div>
                <q-item-label lines="2" class="text-caption text-grey">
                  {{ adv.description  }}
                </q-item-label>
              </q-card-section>
              <q-card-actions class="absolute-bottom">
                <q-chip class="q-pl-xs" icon="place">
                  {{ adv.place }}
                </q-chip>
              </q-card-actions>
            </q-card>
          </div>
        </div>

        <q-card flat bordered class="q-pa-sm flex flex-center q-mt-md">
          <q-pagination
            v-model="pagination.page"
            :model-value="pagination.page"
            color="deep-orange"
            :max="10"
            :max-pages="adventure.meta.totalPages"
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
  import { defineComponent, ref } from 'vue';
  import {getImage} from 'src/graphql/utils/utils';
  import Footer from 'layouts/public/Footer.vue';
  import {useAdventuresPublic} from 'src/graphql/adventure/adventures-public';

  export default defineComponent({
    name: 'AreaLayout',
    components: { Footer },
    setup() {

      return {
        left: ref(false),
        getImage,
        ...useAdventuresPublic(),
      }
    }
  })
</script>
<style lang="sass" scoped>
  .WAL__drawer_open
    display: none
  .WAL__drawer_close
    display: none
  @media (max-width: 691px)
    .WAL__drawer_open
      display: block
    .WAL__drawer_close
      display: block
    .text-uppercase
      font-size: 10px
  .q-card--bordered
    overflow: hidden
  .subject
    z-index: 99
    position: absolute
    -webkit-transform: rotate(45deg)
      transform: rotate(45deg)
    right: -30px
    top: 22px
    text-align: center
    background: orangered
    width: 140px
</style>
