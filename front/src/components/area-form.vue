<template>
  <q-form class="q-col-gutter-md row">
    <div class="col-12 col-md-4">
      <div class="text-h6">Télécharger une image</div>
      <q-img
        style="height: 300px;" :src="urlList[0]||'sign-in.svg'"
        spinner-color="amber">
        <div class="bg-transparent">
          <q-btn
            outline
            v-if="urlList.length"
            color="amber"
            icon="close"
            @click="urlList.length = 0; banner.length = 0"
          />
          <q-btn
            outline
            v-else
            color="amber"
            label="Choisir"
            icon="photo_camera"
            @click="$refs.file.$el.click()"
          >
            <q-file
              :model-value="banner"
              v-model="banner"
              accept=".jpg, image/*"
              multiple
              :max-files="1"
              max-file-size="2048000"
              @update:model-value="preview($event)"
              v-show="false"
              ref="file"
            />
          </q-btn>
        </div>
      </q-img>
    </div>
    <div class="col-12 col-md-4 q-gutter-y-lg">
      <div class="text-h6">Informations générales</div>
      <q-input
        :model-value="input.name"
        v-model="input.name"
        square
        dense
        type="text"
        :label="$t('name')"
        label-color="white"
        :lazy-rules="true"
        :rules="[v => v && v.length]"
        no-error-icon
        hide-bottom-space
        name="name"
        color="white"
      />
      <q-item-section>
        <q-item-label>{{$t('area.type')}}</q-item-label>
        <q-item-label class="text-white" caption>
          <q-radio
            color="amber"
            keep-color
            :val="index"
            v-for="(t, index) in $tm('area.longTypes')"
            :model-value="index"
            :label="t"
            v-model="input.type"
            :key="index"
          />
        </q-item-label>
      </q-item-section>
      <q-separator color="white" />
      <q-input
        :model-value="input.region"
        v-model="input.region"
        square
        dense
        type="text"
        :label="$t('region')"
        :lazy-rules="true"
        :rules="[v => v && v.length]"
        no-error-icon
        hide-bottom-space
        name="region"
        color="white"
      />
      <q-input
        dense
        :model-value="input.surface"
        v-model.number="input.surface"
        :label="$t('surface')"
        type="number"
        spellcheck="false"
        :lazy-rules="true"
        :rules="[v => v && v >= 0]"
        no-error-icon
        hide-bottom-space
        name="surface"
        suffix="ha"
        color="white"
      />
    </div>

    <div class="col-12 col-md-4 q-gutter-y-lg">
      <div class="text-h6">Villes périphériques</div>
      <div
        v-for="(p, index) in input.peripherals"
        :key="index"
        class="row"
      >
        <q-input
          color="white"
          v-model.number="p.city"
          :model-value="p.city"
          dense
          :label="$t('city') + ' ' + (index + 1)"
          class="col"
        />
        <q-input
          type="number"
          color="white"
          dense
          :label="$t('distance')"
          class="col"
          v-model.number="p.distance"
          :model-value="p.distance"
          suffix="km"
        >
          <template v-slot:after>
            <q-icon
              name="close"
              color="deep-orange"
              class="cursor-pointer"
              @click="removeCity(index)"
            />
          </template>
        </q-input>
      </div>
      <q-card-actions align="right">
        <q-btn
          outline
          color="amber"
          dense
          icon="add"
          @click="addCity"
        />
      </q-card-actions>
    </div>

    <div class="col-12 q-mt-lg">
      <q-btn
        icon="add"
        outline
        unelevated
        color="orange"
        label="Valider"
        class="full-width"
      />
    </div>

  </q-form>
  <q-page-sticky position="bottom-left" :offset="[18, 18]">
    <q-btn
      no-caps
      @click="$router.back()"
      label="Précedent"
      icon="arrow_back"
      color="secondary"
    />
  </q-page-sticky>
</template>

<script lang="ts">
  import {defineComponent, ref, reactive } from 'vue';
  import {useImageLoader} from 'src/graphql/utils/preview';
  import {CreateAreaInput} from 'src/graphql/types';

  export default defineComponent({
  name: 'area-form',
  setup() {
    const input = reactive<CreateAreaInput>({
      name: '',
      type: 0,
      peripherals: [],
      region: '',
      surface: 0
    });
    const banner = ref<any[]>([]);
    function addCity() {
      input.peripherals.push({ city: '', distance: 25 })
    }
    function removeCity(index: number) {
      input.peripherals.splice(index, 1);
    }
    const { urlList, previewImages} = useImageLoader();
    const preview = (e: FileList) => {
      if (e && e.length) {
        previewImages(e);
      }
    }
    return {
      input,
      preview,
      urlList,
      banner,
      removeCity,
      addCity,
    }
  }
})
</script>

<style scoped>

</style>
