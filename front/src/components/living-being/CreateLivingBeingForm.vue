<template>
  <p>Nouvel être vivant</p>
  <q-card flat bordered>
    <q-card-section class="text-center">Informations générales</q-card-section>
    <q-separator />
    <q-card-section :horizontal="$q.screen.gt.sm" class="q-pa-none">
      <q-card-section class="q-pa-sm">
        <q-carousel
          v-model="slide"
          animated
          control-color="amber"
          navigation
          infinite
          height="200px"
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
          :model-value="images"
          v-model="images"
          accept=".jpg, image/*"
          multiple
          max-files="5"
          max-file-size="2048000"
          @update:model-value="previewImages($event)"
          v-show="false"
          ref="file" />
        <q-btn
          outline
          icon-right="insert_photo"
          label="Charger les images de présentation"
          @click="$refs.file.$el.click()"
          no-caps
          color="white"
          class="q-mt-md full-width"
        />
      </q-card-section>
      <q-separator vertical v-if="$q.screen.gt.sm" />
      <q-card-section class="col">
        <q-card-section :horizontal="$q.screen.gt.sm">
          <div class="col">
            <q-input
              dense
              label="Nom scientifique"
              label-color="white"
            />
            <q-input
              class="full-width"
              dense
              label="Noms locaux"
              label-color="white"
            />
          </div>
          <q-list dense class="col">
            <q-item>
              <q-item-section side>
                <q-icon name="park" />
              </q-item-section>
              <q-item-section>
                Parcs où l'on trouve
              </q-item-section>
              <q-item-section side>
                <q-btn flat icon="add" round />
              </q-item-section>
            </q-item>
            <q-item>
              p1, p2
            </q-item>
          </q-list>
        </q-card-section>
        <q-expansion-item
          :label="`En ${lang.label}`"
          group="i18n"
          v-for="(lang, i) in $tm('languages')"
          :key="i"
          :switch-toggle-side="true"
          :default-opened="i === 0"
          header-class="q-pa-none"
        >
          <q-card-section
            :horizontal="$q.screen.gt.sm"
            class="q-gutter-sm q-py-sm"
          >
            <q-input
              label="nom vernaculaire"
              label-color="white"
              :model-value="input.names[i + 1]"
              v-model="input.names[i + 1]"
              dense
            />
            <q-input
              dense
              class="col"
              :model-value="input.specificities[i]"
              v-model="input.specificities[i]"
              autogrow
              label="Spécificités"
              label-color="white"
            />
          </q-card-section>
        </q-expansion-item>
      </q-card-section>
    </q-card-section>
    <q-separator />
    <q-card-section class="text-center">Classication scientifique</q-card-section>
    <q-separator />
    <q-card-section class="flex justify-between items-start q-gutter-sm q-pa-sm">
      <q-input
        v-for="(field, i) in $tm(`classification.classifiers`)"
        :key="i"
        :label="field"
        label-color="white"
      />
    </q-card-section>
    <q-separator />
    <q-card-actions>
      <q-btn
        icon="send"
        label="Créer"
        flat
        class="full-width"
        no-caps
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useImageLoader} from 'src/graphql/utils/preview';
import {useCreateLivingBeing} from 'src/graphql/living-being/create-living-being';
import {classificationKeys} from 'src/graphql/utils/utils';

export default defineComponent({
  name: 'CreateLivingBeingForm',
  components: {},
  setup() {
    return {
      ...useImageLoader(),
      slide: ref(0),
      ...useCreateLivingBeing(),
      keys: classificationKeys
    }
  }
})
</script>

<style scoped>

</style>
