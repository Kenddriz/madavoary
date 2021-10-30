<template>
  <q-dialog ref="dialogRef">
    <MovableCard resizable>
      <template v-slot:title>
        {{$t('loading.update').replace('...', '')}}
      </template>
      <ImageInput
        :src="src"
        @upload="updateImage($event[0], collectionId, imageIndex)"
      />
      <template v-slot:footer>
        <div class="full-width flex flex-center text-subtitle1">
          <q-spinner v-if="loading" color="amber" thickness="10px" size="md" />
          <span v-else>Image n°{{imageIndex + 1}}</span>
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
import {useUpdateCollectionImage} from 'src/graphql/collection/update-collection-image';

export default defineComponent({
  name: 'UpdateCollectionImage',
  components: { MovableCard, ImageInput },
  props: {
    src: String,
    collectionId: Number,
    imageIndex: Number
  },
  setup() {
    const { dialogRef } = useDialogPluginComponent()
    return {
      dialogRef,
      ...useUpdateCollectionImage()
    }
  }
})
</script>

<style scoped>

</style>
