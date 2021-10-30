<template>
  <q-card flat bordered>
    <q-carousel
      animated
      v-model="params.slide"
      arrows
      navigation
      infinite
      height="220px"
      control-color="warning"
    >
      <q-carousel-slide
        v-for="(image, index) in collection?.images||[]"
        :name="index"
        :img-src="`${uri}${collection.natureId}/${image}`"
        :key="index"
      >
        <div class="absolute-center custom-caption text-h6">
          <q-btn
            round
            icon="photo"
            size="sm"
            color="warning"
            @click="updateCollectionImage"
          />
        </div>
      </q-carousel-slide>
    </q-carousel>

    <q-separator />


    <div class="flex justify-between wrap items-center">
      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label>{{$t('subject')}}</q-item-label>
            <q-item-label caption>
              {{$tm('collection-subjects').find(u => u.id === String(collection?.natureId))?.title}}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>{{$t('naming')}}</q-item-label>
            <q-item-label caption>
              {{collection?.naming}}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>{{$t('place')}}</q-item-label>
            <q-item-label caption>
              {{collection?.place}}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-circular-progress
        show-value
        font-size="15px"
        :max="5"
        :min="0"
        class="text-white q-ma-md"
        :value="5"
        size="100px"
        :thickness="0.05"
      >
        <q-icon name="bar_chart" class="q-mr-xs" />
        {{ params.size * 20 }} %
      </q-circular-progress>
      <q-item>
        <q-item-section>
          <q-item-label>Images publiées</q-item-label>
          <q-item-label class="text-center" caption>
            {{params.size}}/5
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
    <q-separator />

    <q-item class="row justify-between">
      <q-item-section>
        <q-item-label>{{$t('createdAt')}}</q-item-label>
        <q-item-label caption>
          {{formatDate(collection?.createdAt, $t('dateTime'))}}
        </q-item-label>
      </q-item-section>
      <q-item-section class="text-right">
        <q-item-label>{{$t('updatedAt')}}</q-item-label>
        <q-item-label caption>
          {{formatDate(collection?.updatedAt, $t('dateTime'))}}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-list dense>
      <q-item-label class="q-py-sm" header>{{$t('description')}}</q-item-label>
      <q-item>
        <q-item-section>
          <q-item-label lines="1">
            {{collection?.description}}
          </q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-btn icon="read_more" round flat dense color="white">
            <q-popup-proxy class="bg-primary q-pa-md">
              {{collection?.description}}
            </q-popup-proxy>
          </q-btn>
        </q-item-section>
      </q-item>
    </q-list>
    <q-separator />
    <q-card-actions align="between">
      <q-btn
        @click="update"
        outline
        text-color="white"
        icon="edit"
      />
      <q-btn
        outline
        text-color="white"
        icon="delete_forever"
      />
      <q-btn
        :disable="params.size === 5"
        outline
        text-color="white"
        icon="add_photo_alternate"
        @click="addCollectionImage"
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import {defineComponent, reactive, watch} from 'vue';
import {formatDate} from 'src/graphql/utils/utils';
import {useQuasar} from 'quasar';
import UpdateCollection from 'components/collection/UpdateCollection.vue';
import UpdateCollectionImage from 'components/collection/UpdateCollectionImage.vue';
import AddCollectionImage from 'components/collection/AddCollectionImage.vue';

export default defineComponent({
  name: 'CollectionDetails',
  components: {  },
  props: ['collection'],
  setup(props) {
    const params = reactive({
      slide: 0,
      size: 0
    });
    watch(() => props.collection?.images, images => {
      params.size = images.length;
      if(params.slide > images.length - 1) params.slide = 0;
    });
    const { dialog } = useQuasar();
    const uri = process.env.uri + 'collections/';
    return {
      params,
      formatDate,
      uri,
      update: () => {
        dialog({
          component: UpdateCollection,
          componentProps: { collection: props.collection }
        })
      },
      updateCollectionImage: () => {
        dialog({
          component: UpdateCollectionImage,
          componentProps: {
            collectionId: props.collection.id,
            imageIndex: params.slide,
            src: `${uri}${props.collection.natureId}/${props.collection.images[params.slide]}`
          }
        })
      },
      addCollectionImage: () => {
        dialog({
          component: AddCollectionImage,
          componentProps: {
            collectionId: props.collection.id,
            imageNumber: params.size + 1,
          }
        })
      }
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
