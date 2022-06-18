<template>
  <q-page class="q-py-lg bg-primary">
    <AdventureForm
      v-model:naming="input.detail.naming"
      v-model:place="input.detail.place"
      v-model:nature-id="input.detail.natureId"
      v-model:description="input.detail.description"
      @validate="createAdventure()"
      @reset="reset()"
    >
      <q-btn
        outline
        icon-right="insert_photo"
        label="Télécharger des images"
        @click="$refs.file.$el.click()"
        no-caps
        color="white"
        class="q-mb-md full-width"
      />
      <q-carousel
        v-model="slide"
        animated
        control-color="amber"
        navigation
        infinite
        height="300px"
        class="q-card--bordered bg-transparent"
      >
        <q-carousel-slide
          v-for="(url, index) in urlList"
          :key="index"
          :name="index"
          :img-src="url"
          class="carousel-image"
        />
      </q-carousel>
      <q-file
        :model-value="input.images"
        accept=".jpg, image/*"
        multiple
        :max-files="uploadParams.maxImagesAdventure"
        :max-file-size="uploadParams.maxFileSize"
        @update:model-value="onPreview($event)"
        v-show="false"
        ref="file" />
      <template v-slot:button>
        <q-icon left name="save" />
        <div>{{ $t('create.btn') }}</div>
      </template>
    </AdventureForm>
  </q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import { useCreateAdventure } from 'src/graphql/adventure/create-adventure';
import AdventureForm from 'components/adventure/adventure-form.vue';

export default defineComponent({
  name: 'adventures-creation',
  components: { AdventureForm },
  setup() {
    return {
      ...useCreateAdventure(),
      uploadParams: {
        maxImagesAdventure: process.env.maxImagesAdventure,
        maxFileSize: process.env.maxFileSize,
      }
    }
  }
})
</script>

<style scoped>

</style>
