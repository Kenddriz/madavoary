<template>
  <q-layout view="hhh lpR fff">

    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          color="deep-orange"
          dense
          icon="arrow_back"
          @click="$router.back()"
        />
        <q-toolbar-title class="text-uppercase">
          {{livingBeing?.names[0] || 'Madavoary'}}
        </q-toolbar-title>
        <q-btn flat round dense icon="whatshot" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding class="bg-secondary">
        <template v-if="livingBeing">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4">
              <q-carousel
                v-if="size = livingBeing.images.length"
                swipeable
                animated
                v-model="slide"
                :thumbnails="size > 1"
                infinite
                class="col-12 col-md-4"
              >
                <q-carousel-slide
                  v-for="(img, index) in livingBeing.images"
                  :key="index"
                  :name="index"
                  :img-src="getImage(img, `livingBeings/`)"
                />
              </q-carousel>
              <q-img v-else height="350px" :src="getImage('', `livingBeings/`)" />
            </div>
            <div class="col-12 col-md-4">
              <q-list class="q-card--bordered q-mb-md">
                <q-item-label header>Nominalisation</q-item-label>
                <q-item
                  v-for="(lab, index) in nameLabels"
                  :key="index"
                >
                  <q-item-section>
                    {{ $t(`livingBeing.${lab}`) }} :
                  </q-item-section>
                  <q-item-section side>
                    {{ livingBeing.names[index] || '-' }}
                  </q-item-section>
                </q-item>
              </q-list>
              <q-card flat bordered class="bg-transparent">
                <q-card-section class="q-pb-none">
                  Parcs où l'on trouve
                </q-card-section>
                <q-card-section class="flex overflow-auto">
                  <q-chip
                    v-for="(area, index) in livingBeing.areas"
                    :key="index"
                    clickable
                    @click="$router.push(`/area/${area.id}`)"
                  >
                    <q-avatar
                    >
                      <img :src="getImage(area.banner, `areas/`)">
                    </q-avatar>
                    {{ area.name }}
                  </q-chip>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 col-md-4">
              <q-list class="q-card--bordered">
                <q-checkbox
                  color="orange"
                  keep-color
                  :model-value="livingBeing.endemic"
                  :label="$t('livingBeing.endemic')"
                  class="q-ma-sm"
                />
                <q-item-label header>
                  Descriptions
                </q-item-label>
                <q-expansion-item
                  v-for="(desc, index) in $tm('livingBeing.descriptions')"
                  :key="index"
                  :label="desc"
                  group="somegroup"
                >
                  <q-card flat class="bg-transparent">
                    <q-card-section>
                      {{ livingBeing.descriptions[index] }}
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-list>
            </div>
          </div>
          <q-list class="flex wrap q-gutter-md">
            <q-item-label header class="q-pb-none full-width text-uppercase">
              Classification scientifique
            </q-item-label>
            <q-card
              bordered
              flat
              class="bg-transparent"
              v-for="(cl, index) in livingBeing.classifiers"
              :key="index"
            >
              <q-item-label header class="q-pb-none">
                {{ $tm('classification.classifiers')[cl.level] }}
              </q-item-label>
              <q-card-section class="q-mt-none">
                {{ cl.label }}
              </q-card-section>
            </q-card>
          </q-list>
        </template>
      </q-page>
    </q-page-container>

    <Footer />

  </q-layout>
</template>


<script lang="ts">
  import {defineComponent, ref} from 'vue';
  import {LivingBeing, QueryFindLivingBeingArgs} from 'src/graphql/types';
  import {gql} from '@apollo/client';
  import {LIVING_BEING_FIELDS} from 'src/graphql/living-being/living-being';
  import {CLASSIFIER_FIELDS} from 'src/graphql/classifier/classifier';
  import {useQuery, useResult} from '@vue/apollo-composable';
  import {useRouter} from 'vue-router';
  import {getImage} from 'src/graphql/utils/utils';
  import Footer from 'layouts/public/Footer.vue';
    type FindLingBeingData = {
      findLivingBeing: LivingBeing,
    }
    const QUERY = gql`
    query FindLivingBeing($id: Int!){
      findLivingBeing(id: $id){
        ${LIVING_BEING_FIELDS}
        areas{id name banner}
        classifiers{${CLASSIFIER_FIELDS}}
      }
    }
  `;
    export default defineComponent({
      name: 'living-being-details',
      components: { Footer },
      setup() {
        const router = useRouter();
        const id = Number(router.currentRoute.value.params.id);
        const { loading, result } = useQuery<
          FindLingBeingData,
          QueryFindLivingBeingArgs
          >(QUERY, { id });
        const livingBeing = useResult<
          FindLingBeingData | undefined,
          LivingBeing,
          LivingBeing
          >(result, undefined, res => res.findLivingBeing)
          return {
            livingBeing,
            loading,
            slide: ref(0),
            getImage,
            nameLabels: [ 'scientific', 'locals', 'french', 'english'],
          }
      }
    })
</script>

<style scoped>

</style>
