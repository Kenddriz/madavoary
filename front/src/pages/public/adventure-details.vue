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
          {{ adventure?.naming || 'Madavoary' }}
        </q-toolbar-title>

        <q-btn flat round dense icon="whatshot" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding class="bg-secondary">
        <div v-if="adventure" class="q-col-gutter-md row">
          <div class="col-12 col-md-6">
            <q-carousel
              animated
              v-model="slide"
              arrows
              swipeable
              thumbnails
              infinite
              control-color="warning"
              height="86vh"
            >
              <q-carousel-slide
                v-for="(image, index) in adventure.images"
                :name="index"
                :img-src="getImage(image, `adventures/${adventure?.natureId}/`)"
                :key="index"
                class="carousel-image"
              >
                <div class="absolute-top-right q-pa-md text-h6">
                  {{ slide + 1 }} / {{ adventure.images.length }}
                </div>
              </q-carousel-slide>
            </q-carousel>
          </div>
          <div class="col-12 col-md-6">
            <q-list padding class="q-card--bordered">
              <q-item v-if="avt = $tm('adventure-subjects')[adventure.natureId]">
                <q-item-section avatar>
                  <q-icon :name="avt.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label overline>Type d'aventure</q-item-label>
                  <q-item-label>
                    {{ avt.title }}
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label overline>Titre/nom</q-item-label>
                  <q-item-label>{{ adventure.naming }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-icon name="place" />
                </q-item-section>
                <q-item-section>
                  <q-item-label overline>Titre/nom</q-item-label>
                  <q-item-label>{{ adventure.naming }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label header>Description</q-item-label>
                  <q-item-label style="line-height: 1.5!important;">
                    {{ adventure.description }}
                  </q-item-label>
                </q-item-section>
              </q-item>

            </q-list>
          </div>
        </div>

        <q-inner-loading :showing="loading">
          <q-skeleton class="bg-amber" size="200px" animation="pulse" />
          <div class="text-h5 q-mt-lg text-amber">
            Chargement ...
          </div>
        </q-inner-loading>
      </q-page>
    </q-page-container>

    <Footer />

  </q-layout>

</template>

<script lang="ts">
  import {Adventure, QueryFindAdventureArgs} from 'src/graphql/types';
  import {gql} from '@apollo/client';
  import {ADVENTURE_FIELDS} from 'src/graphql/adventure/adventure';
  import {computed, defineComponent, ref} from 'vue';
  import {useRouter} from 'vue-router';
  import {useQuery, useResult} from '@vue/apollo-composable';
  import {getImage} from 'src/graphql/utils/utils';
  import Footer from 'layouts/public/Footer.vue';

  type FindAdventureData = {
    findAdventure: Adventure;
  }

  const QUERY = gql`
   query FindAdventure($id: Int!){
      findAdventure(id: $id){
          ${ADVENTURE_FIELDS}
      }
   }
`;
  export default defineComponent({
    name: 'adventure-details',
    components: { Footer },
    setup() {
      const router = useRouter();
      const id = Number(router.currentRoute.value.params.id);
      const { loading, result } = useQuery<
        FindAdventureData,
        QueryFindAdventureArgs
        >(QUERY, { id });

      const adventure = useResult<
        FindAdventureData | undefined,
        Adventure,
        Adventure
        >(result, undefined, res => res.findAdventure);

        return {
          adventure,
          loading,
          slide: ref(0),
          uri: computed(() => `${process.env.uri}adventures/${adventure.value?.natureId}/`),
          getImage,
        }
    }
  })
</script>

<style scoped>

</style>
