<template>
  <q-card flat bordered>
    <q-carousel
      animated
      v-model="slide"
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
          <q-btn round icon="photo" size="sm" color="warning" />
        </div>
      </q-carousel-slide>
    </q-carousel>

    <q-separator />

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
          <q-item-label lines="2">
            {{collection?.description?.substr(0, 200)}}
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
    <template v-if="collection?.userId === userId">
      <q-separator />
      <q-card-actions align="between">
        <q-btn @click="update" outline color="brown" text-color="white" icon="edit" />
        <q-btn outline color="brown" text-color="white" icon="delete_forever"/>
      </q-card-actions>
    </template>
  </q-card>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from 'vue';
import {formatDate} from 'src/graphql/utils/utils';
import {useQuasar} from 'quasar';
import UpdateCollection from 'components/collection/UpdateCollection.vue';

export default defineComponent({
  name: 'CollectionDetails',
  components: {  },
  props: ['collection'],
  setup(props) {
    const slide = ref<number>(0);
    watch(() => props.collection?.images, images => {
      if(slide.value > images.length - 1) slide.value = 0;
    });
    const { dialog } = useQuasar();
    return {
      slide,
      userId: Number(localStorage.getItem('id')),
      formatDate,
      uri: process.env.uri + 'collections/',
      update: () => {
        dialog({
          component: UpdateCollection,
          componentProps: { collection: props.collection }
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
