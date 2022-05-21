<template>
  <q-form class="q-col-gutter-md row">
    <div class="col-12 col-md-4">
      <div class="text-h6">Télécharger une image</div>
      <q-img
        style="height: 65vh;" :src="urlList[0]||src||'sign-in.svg'"
        spinner-color="orange">
        <div class="bg-transparent">
          <q-btn
            outline
            v-if="urlList.length"
            color="amber"
            icon="close"
            @click="cancelUpload()"
          />
          <q-btn
            outline
            v-else
            color="orange"
            label="Choisir"
            icon="photo_camera"
            @click="$refs.file.$el.click()"
          >
            <q-file
              :model-value="banner"
              accept=".jpg, image/*"
              multiple
              :max-files="1"
              :max-file-size="maxFileSize"
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
        :model-value="name"
        @update:model-value="$emit('update:name', $event)"
        square
        dense
        type="text"
        :label="$t('name')"
        :lazy-rules="true"
        :rules="[v => v && v.length]"
        no-error-icon
        hide-bottom-space
        name="name"
        color="orange"
      />
      <q-item-section>
        <q-item-label>{{$t('area.type')}}</q-item-label>
        <q-item-label class="text-white" caption>
          <q-radio
            color="orange"
            keep-color
            :val="index"
            v-for="(t, index) in $tm('area.longTypes')"
            :model-value="type"
            :label="t"
            @update:model-value="$emit('update:type', $event)"
            :key="index"
          />
        </q-item-label>
      </q-item-section>
      <q-separator color="white" />
      <q-input
        :model-value="region"
        @update:model-value="$emit('update:region', $event)"
        square
        dense
        type="text"
        :label="$t('region')"
        :lazy-rules="true"
        :rules="[v => v && v.length]"
        no-error-icon
        hide-bottom-space
        name="region"
        color="orange"
      />
      <q-input
        dense
        :model-value="surface"
        @update:model-value="$emit('update:surface', Number($event))"
        :label="$t('surface')"
        type="number"
        spellcheck="false"
        :lazy-rules="true"
        :rules="[v => v && v >= 0]"
        no-error-icon
        hide-bottom-space
        name="surface"
        suffix="ha"
        color="orange"
      />
    </div>

    <div class="col-12 col-md-4 q-gutter-y-lg">
      <div class="text-h6">Villes périphériques</div>
      <div
        v-for="(p, index) in peripherals"
        :key="index"
        class="row"
      >
        <q-input
          color="orange"
          v-model.number="p.city"
          :model-value="p.city"
          dense
          :label="$t('city') + ' ' + (index + 1)"
          class="col"
        />
        <q-input
          type="number"
          color="orange"
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

    <div class="col-12 q-mt-lg text-right">
      <q-btn
        no-caps
        color="orange"
        outline
        unelevated
        @click="$emit('validate')"
      >
        <slot name="button"></slot>
      </q-btn>
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
  import { defineComponent, ref } from 'vue';
  import { useImageLoader } from 'src/graphql/utils/preview';

  export default defineComponent({
      name: 'area-form',
      props: {
        name: String,
        type: { type: Number, default: 0 },
        peripherals: { type: Array, default: () => [] },
        region: String,
        surface: Number,
        banner: { type: Array, default: () => [] },
        src: String,
      },
      emits: [
        'update:name',
        'update:type',
        'update:peripherals',
        'update:region',
        'update:surface',
        'update:banner',
        'validate'
      ],
      setup(props, { emit }) {
        const banner = ref<any[]>([]);
        function addCity() {
          const peripherals = [...props.peripherals];
          peripherals.push({ city: '', distance: 25 });
          emit('update:peripherals', peripherals);
        }
        function removeCity(index: number) {
          const peripherals = [...props.peripherals];
          peripherals.splice(index, 1);
          emit('update:peripherals', peripherals);
        }
        const { urlList, previewImages} = useImageLoader();
        const preview = (e: FileList) => {
          if (e && e.length) {
            emit('update:banner', e);
            previewImages(e);
          }
        }
        return {
          preview,
          urlList,
          removeCity,
          addCity,
          cancelUpload: function () {
            urlList.value.length = 0;
            banner.value.length = 0
          },
          maxFileSize: Number(process.env.maxFileSize)
        }
      }
})
</script>

<style scoped>

</style>
