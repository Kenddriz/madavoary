<template>
  <q-page class="q-pa-sm">
    <template v-if="livingBeing">
      <LivingBeingForm
        v-model:names="input.names"
        v-model:area-ids="input.areaIds"
        v-model:classifier-ids="input.classifierIds"
        v-model:descriptions="input.descriptions"
        v-model:endemic="input.endemic"
        @validate="updateLivingBeing(input)"
      >
        <q-card class="col-12 col-md-4 bg-primary" flat bordered>
          <q-card-section horizontal>
            <q-carousel
              animated
              v-model="slide"
              arrows
              swipeable
              thumbnails
              infinite
              control-color="warning"
              class="col"
            >
              <q-carousel-slide
                v-for="(image, index) in livingBeing.images||[]"
                :name="index"
                :img-src="`${uri}${image}`"
                :key="index"
              >
                <div class="absolute-center custom-caption text-h6">
                  {{ slide + 1 }} / {{ livingBeing.images.length }}
                </div>
              </q-carousel-slide>
            </q-carousel>

            <q-card-actions vertical class="justify-around q-px-md">
              <LivingBeingUpdateImage
                :src="`${uri}${livingBeing.images[slide]}`"
                :id="livingBeing.id"
                :index="slide"
              />
              <q-btn
                @click="removeImage(livingBeing.id, slide)"
                flat
                round
                color="red"
                icon="delete"
              />
              <LivingBeingAddImage
                :disabled="livingBeing.images.length >= maxImagesAdventure"
                :id="livingBeing.id"
                :image-number="livingBeing.images.length + 1"
              />
            </q-card-actions>
          </q-card-section>
        </q-card>
        <template v-slot:button>
          <q-icon left size="1.5em" name="save" />
          <div>Enregistrer vos modifications</div>
        </template>
      </LivingBeingForm>
      <ImageStatistic
        :image-length="livingBeing.images.length"
        :created-at="livingBeing.createdAt"
        :updated-at="livingBeing.updatedAt"
        :max-images-adventure="maxImagesAdventure"
      />
    </template>

    <q-inner-loading :showing="findLoading">
      <q-skeleton class="bg-amber" size="200px" animation="pulse" />
      <div class="text-h5 q-mt-lg text-amber">
        Chargement ...
      </div>
    </q-inner-loading>
  </q-page>
</template>

<script lang="ts">
  import {defineComponent, reactive, ref, watch} from 'vue';
  import LivingBeingForm from 'components/living-being/living-being-form.vue';
  import {Classifier, LivingBeing, QueryFindLivingBeingArgs, UpdateLivingBeingInput} from 'src/graphql/types';
  import {gql} from '@apollo/client';
  import {defaultLivingBeingInput, LIVING_BEING_FIELDS} from 'src/graphql/living-being/living-being';
  import {useRouter} from 'vue-router';
  import {useQuery, useResult} from '@vue/apollo-composable';
  import ImageStatistic from 'components/shared/ImageStatistic.vue';
  import {useUpdateLivingBeing} from 'src/graphql/living-being/update-living-being';
  import LivingBeingUpdateImage from 'components/living-being/living-being-update-image.vue';
  import LivingBeingAddImage from 'components/living-being/living-being-add-image.vue';
  import {useLivingBeingRemoveImage} from 'src/graphql/living-being/living-being-remove-image';

  type FindLingBeingData = {
    findLivingBeing: LivingBeing,
  }
  const FIND_LIVING_BEING = gql`
    query FindLivingBeing($id: Int!){
      findLivingBeing(id: $id){
        ${LIVING_BEING_FIELDS}
        areas{id}
        classifiers{id level}
      }
    }
  `;
  export default defineComponent({
    name: 'living-beings-update',
    components: {
      LivingBeingForm,
      LivingBeingUpdateImage,
      LivingBeingAddImage,
      ImageStatistic
    },
    setup() {
      const router = useRouter();
      const id = Number(router.currentRoute.value.params.id);
      const input = reactive<UpdateLivingBeingInput>({ id: 0, ...defaultLivingBeingInput });

      const { loading: findLoading, result } = useQuery<
        FindLingBeingData,
        QueryFindLivingBeingArgs
        >(FIND_LIVING_BEING, { id });

      function reset(val: any = null) {
        const lb: LivingBeing = val || livingBeing.value
        input.id = lb.id;
        input.descriptions = lb.descriptions;
        input.endemic = lb.endemic;
        input.names = lb.names;
        input.areaIds = lb.areas.map((a: any) => a.id)
        /**level is index of 32 classifier array**/
        input.classifierIds.forEach((cId: any, level: number) => {
          const classifier = lb.classifiers.find((c: Classifier) => c.level === level);
          if(classifier) input.classifierIds[level] = classifier.id;
        })
      }

      const livingBeing = useResult<
        FindLingBeingData | undefined,
        LivingBeing,
        LivingBeing
        >(result, undefined, res => res.findLivingBeing)

      watch(() => livingBeing.value, (v) => {
        if(v) reset(v);
      }, { deep: true, immediate: true })
      const slide = ref(0);

      return {
        livingBeing,
        input,
        findLoading,
        slide,
        maxImagesAdventure: Number(process.env.maxImagesAdventure),
        uri: `${process.env.uri}livingBeings/`,
        reset,
        ...useUpdateLivingBeing(),
        ...useLivingBeingRemoveImage(() => {
          slide.value = 0;
        }),
      }
    }
  })
</script>

<style scoped>

</style>
