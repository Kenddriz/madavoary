<template>
  <q-btn
    :disable="disabled"
    flat
    round
    color="orange"
    icon="add"
    @click="dialog = true"
  />
  <q-dialog persistent v-model="dialog">
    <MovableCard resizable>
      <template v-slot:title>
        {{$t('newImage')}}
      </template>
      <ImageInput @upload="addImage($event[0], id)" />
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
import {useLivingBeingAddImage} from 'src/graphql/living-being/living-being-add-image';

export default defineComponent({
  name: 'living-being-add-image',
  components: { MovableCard, ImageInput },
  props: { id: Number, imageNumber: Number, disabled: Boolean },
  setup() {
    return {
      ...useLivingBeingAddImage(),
    }
  }
})
</script>

<style scoped>

</style>
