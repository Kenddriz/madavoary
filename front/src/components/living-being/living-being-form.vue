<template>
    <q-form class="row q-pb-lg">
      <q-card flat class="col-12 col-md-4 bg-primary">
        <q-card-section>
          Images de présentation
        </q-card-section>
        <q-card-section>
          <q-carousel
            v-model="slide"
            animated
            control-color="amber"
            navigation
            infinite
            height="200px"
            class="bg-primary q-card--bordered"
          >
            <q-carousel-slide
              v-for="(url, index) in urlList"
              :key="index"
              :name="index"
              :img-src="url"
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
        </q-card-section>
        <q-card-actions class="q-px-md" align="center">
          <q-btn
            outline
            icon-right="insert_photo"
            label="Charger les images de présentation"
            @click="$refs.file.$el.click()"
            no-caps
            color="blue-grey-3"
            class="q-mt-sm col-12"
          />
        </q-card-actions>
      </q-card>

      <q-card flat class="col-12 col-md-4 bg-primary">
        <q-card-section>
          Nominalisations
        </q-card-section>
        <q-card-section class="q-gutter-y-md">
          <q-input color="warning" outlined v-model="slide" label="Scientifique" />
          <q-input color="warning" outlined v-model="slide" label="Locaux" />
          <q-input color="warning" outlined v-model="slide" label="Anglais" />
          <q-input color="warning" outlined v-model="slide" label="Français" />
        </q-card-section>
      </q-card>

      <q-card flat class="col-12 col-md-4 bg-primary">
        <q-card-section>
          Descriptions
        </q-card-section>
        <q-card-section class="q-gutter-y-md">
          <q-input
            color="warning"
            outlined
            autogrow
            v-model="slide"
            label="Traduction en anglais"
          />
          <q-input
            color="warning"
            outlined
            autogrow
            v-model="slide"
            label="Traduction en français"
          />
        </q-card-section>
        <q-card-section>
          Parcs
        </q-card-section>
        <q-card-section>
          <q-input
            color="warning"
            outlined
            autogrow
            v-model="slide"
            label="Entrer les parcs où l'on trouve"
          />
        </q-card-section>
      </q-card>

      <q-card flat class="col-12 bg-primary">
        <q-card-section>
          Classifications scientifiques
        </q-card-section>
        <q-card-section class="flex justify-between items-start q-gutter-sm q-pa-sm">
          <ClassifiersInput
            :items="getOptions(i)"
            v-for="(field, i) in $tm(`classification.classifiers`)"
            :key="i"
            :label="field"
            v-model="models[i]"
          />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            icon="add"
            label="Ajouter"
            no-caps
            outline
            size="lg"
            color="orange"
            style="min-width: 50%"
          />
        </q-card-actions>
      </q-card>

    </q-form>
</template>

<script lang="ts">
    import {useImageLoader} from 'src/graphql/utils/preview';
    import {defineComponent, ref} from 'vue';
    import {useClassifiers} from 'src/graphql/classifier/classifiers';
    import ClassifiersInput from 'components/classifier/classifiers-input.vue';

    export default defineComponent({
      name: 'living-being-form',
      components: { ClassifiersInput },
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
            getOptions,
            models,
            areaModels
          }
      }
    })
</script>

<style lang="scss" scoped>
  .q-card--bordered {
    border-color: #525d73 !important;
  }
</style>
