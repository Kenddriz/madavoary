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
        <q-card-section class="q-gutter-sm" :horizontal="$q.screen.gt.sm">
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
            <q-item class="q-pa-none">
              <SelectArea v-model="areaModels" />
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label lines="1">
                  {{areaModels.map(x => x.label).join(' - ')}}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="more_vert" />
              </q-item-section>
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
    <q-card-section class="text-center">
      Classication scientifique
    </q-card-section>
    <q-separator />
    <q-card-section class="flex justify-between items-start q-gutter-sm q-pa-sm">
      <ClassifiersInput
        :items="getOptions(i)"
        v-for="(field, i) in $tm(`classification.classifiers`)"
        :key="i"
        :label="field"
        v-model="models[i]"
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
import ClassifiersInput from 'components/classifier/classifiers-input.vue';
import {useClassifiers} from 'src/graphql/classifier/classifiers';
import SelectArea from 'components/area/SelectArea.vue';

export default defineComponent({
  name: 'CreateLivingBeingForm',
  components: { ClassifiersInput, SelectArea },
  setup() {
    const {classifiers} = useClassifiers();

    function getOptions(level: number) {
      return classifiers.value.filter(c => c.level === level);
    }

    const models = ref(Array(32).fill(''));
    const areaModels = ref<any[]>([]);
    return {
      ...useImageLoader(),
      slide: ref(0),
      ...useCreateLivingBeing(),
      getOptions,
      models,
      areaModels
    }
  }
})
</script>

<style scoped>

</style>
