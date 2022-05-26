<template>
  <q-page class="q-pa-sm">
    <template v-if="adventure">
      <AdventureForm
        v-model:nature-id="input.natureId"
        v-model:naming="input.naming"
        v-model:place="input.place"
        v-model:description="input.description"
        @validate="updateAdventure(input)"
        @reset="reset()"
      >
        <q-card class="bg-primary" flat bordered>
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
                v-for="(image, index) in adventure.images||[]"
                :name="index"
                :img-src="`${uri}${image}`"
                :key="index"
              >
                <div class="absolute-center custom-caption text-h6">
                  {{ slide + 1 }} / {{ adventure.images.length }}
                </div>
              </q-carousel-slide>
            </q-carousel>

            <q-card-actions vertical class="justify-around q-px-md">
              <AdventureUpdateImage
                :src="`${uri}${adventure.images[slide]}`"
                :adventureId="adventure.id"
                :imageIndex="slide"
              />
              <q-btn
                @click="removeImage(adventure.id, slide)"
                flat
                round
                color="red"
                icon="delete"
              />
              <AdventureAddImage
                :disabled="adventure.images.length >= maxImagesAdventure"
                :adventure-id="adventure.id"
                :image-number="adventure.images.length + 1"
              />
            </q-card-actions>
          </q-card-section>
        </q-card>
        <template v-slot:button>
          <q-icon left size="1.5em" name="save" />
          <div>Enregistrer vos modifications</div>
        </template>
      </AdventureForm>

      <ImageStatistic
        :image-length="adventure.images.length"
        :created-at="adventure.createdAt"
        :updated-at="adventure.updatedAt"
        :max-images-adventure="maxImagesAdventure"
      />
    </template>

    <q-inner-loading :showing="loadingFind">
      <q-skeleton class="bg-amber" size="200px" animation="pulse" />
      <div class="text-h5 q-mt-lg text-amber">
        Chargement ...
      </div>
    </q-inner-loading>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        no-caps
        @click="$router.back()"
        label="Précedent"
        icon="arrow_back"
        color="secondary"
      />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref } from 'vue';
import {formatDate} from 'src/graphql/utils/utils';
import AdventureForm from 'components/adventure/adventure-form.vue';
import AdventureUpdateImage from 'components/adventure/adventure-update-image.vue';
import AdventureAddImage from 'components/adventure/adventure-add-image.vue';
import {useRouter} from 'vue-router';
import {Adventure, QueryFindAdventureArgs, UpdateAdventureInput} from 'src/graphql/types';
import {useUpdateAdventure} from 'src/graphql/adventure/adventure-update';
import {useQuery, useResult} from '@vue/apollo-composable';
import {gql} from '@apollo/client';
import { ADVENTURE_FIELDS } from 'src/graphql/adventure/adventure';
import {useAdventureRemoveImage} from 'src/graphql/adventure/adventure-remove-image';
import ImageStatistic from 'components/shared/ImageStatistic.vue';

type FindAdventureData = {
  findAdventure: Adventure;
}

const FIND_ADVENTURE = gql`
   query FindAdventure($id: Int!){
      findAdventure(id: $id){
          ${ADVENTURE_FIELDS}
      }
   }
`;

export default defineComponent({
  name: 'adventures-update',
  components: {
    AdventureForm,
    AdventureUpdateImage,
    AdventureAddImage,
    ImageStatistic,
  },
  setup() {
    const router = useRouter();
    const id = Number(router.currentRoute.value.params.id);
    const input = reactive<UpdateAdventureInput>({
      id: 0,
      naming: '',
      place: '',
      description: '',
      natureId: -1
    });

    const slide = ref(0);
    function reset(val: any = null) {
      const { id, naming, place, description, natureId } = val || adventure.value;
      Object.assign(input, { id, naming, place, description, natureId });
    }
    const { loading: loadingFind, result } = useQuery<
      FindAdventureData,
      QueryFindAdventureArgs
      >(FIND_ADVENTURE, { id });

    const adventure = useResult<
      FindAdventureData | undefined,
      Adventure,
      Adventure
      >(result, undefined, res => {
      if(res.findAdventure) reset(res.findAdventure);
      return res.findAdventure;
    });

    return {
      slide,
      formatDate,
      uri: computed(() => `${process.env.uri}adventures/${adventure.value?.natureId}/`),
      adventure,
      loadingFind,
      maxImagesAdventure: Number(process.env.maxImagesAdventure),
      ...useUpdateAdventure(),
      ...useAdventureRemoveImage(() => {
        slide.value = 0;
      }),
      input,
      reset,
    }
  }
})
</script>

<style scoped>
.custom-caption {
  color: white;
  background-color: rgba(0, 0, 0, .3);
  padding: 12px
}
</style>
