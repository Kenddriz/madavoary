<template>
  <q-dialog ref="dialogRef">
    <MovableCard resizable>
      <template v-slot:title>
        {{$t('loading.create').replace('...', '')}}
      </template>
      <ImageInput @upload="addImage($event[0], collectionId)" />
      <template v-slot:footer>
        <div class="full-width flex flex-center text-subtitle1">
          <q-spinner v-if="loading" color="amber" thickness="10px" size="md" />
          <span v-else>Image n°{{imageNumber}}</span>
        </div>
      </template>
    </MovableCard>
  </q-dialog>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import MovableCard from '../shared/MovableCard.vue';
import ImageInput from '../shared/ImageInput.vue';
import {useDialogPluginComponent} from 'quasar';
import {useAddCollectionImage} from 'src/graphql/collection/add-collection-image';

export default defineComponent({
  name: 'AddCollectionImage',
  components: { MovableCard, ImageInput },
  props: {collectionId: Number, imageNumber: Number },
  setup() {
    const { dialogRef } = useDialogPluginComponent()
    return {
      dialogRef,
      ...useAddCollectionImage()
    }
  }
})
</script>

<style scoped>

</style>
