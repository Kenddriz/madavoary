<template>
  <LivingBeingForm
    v-model:names="input.names"
    v-model:area-ids="input.areaIds"
    v-model:classifier-ids="input.classifierIds"
    v-model:descriptions="input.descriptions"
    v-model:endemic="input.endemic"
    @validate="submitCreation"
  >
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
          :max-file-size="maxFileSize"
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
    <template v-slot:button>
      <q-icon left name="add" />
      <div>{{ $t('add') }}</div>
    </template>
  </LivingBeingForm>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';
  import LivingBeingForm from 'components/living-being/living-being-form.vue';
  import {useCreateLivingBeing} from 'src/graphql/living-being/create-living-being';

  export default defineComponent({
    name: 'living-beings-creation',
    components: { LivingBeingForm },
    setup() {
      return {
        ...useCreateLivingBeing(),
        maxFileSize: Number(process.env.maxFileSize),
      }
    }
  })
</script>

<style scoped>

</style>
