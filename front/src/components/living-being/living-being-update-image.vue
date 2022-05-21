<template>
  <q-btn
    @click="dialog = true"
    flat
    round
    color="orange"
    icon="edit"
  />
  <q-dialog v-model="dialog">
    <MovableCard resizable>
      <template v-slot:title>
        {{$t('loading.update').replace('...', '')}}
      </template>
      <ImageInput
        :src="src"
        @upload="updateImage($event[0], id, index)"
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
import {useUpdateLivingBeingImage} from 'src/graphql/living-being/living-being-update-image';

export default defineComponent({
  name: 'update-living-being-image',
  components: { MovableCard, ImageInput },
  props: {
    src: String,
    id: Number,
    index: Number
  },
  setup() {
    return {
      ...useUpdateLivingBeingImage()
    }
  }
})
</script>

<style scoped>

</style>
