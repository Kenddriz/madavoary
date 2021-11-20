<template>
  <q-btn
    outline
    color="brown"
    no-caps
    :label="$t('create.btn')"
    text-color="white"
    icon="add"
    @click="showDialog = true"
  />
  <q-dialog seamless v-model="showDialog">
    <MovableCard resizable class="bg-primary" style="padding-bottom: 70px;">
      <template v-slot:title>
        Nouvel être vivant
      </template>
      <q-form
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        @validation-error="validationError"
        ref="formRef"
      >
        <q-expansion-item
          group="group"
          icon="pets"
          label="Nominalisation"
          header-class="text-white"
          default-opened
        >
          <q-card class="q-mt-lg">
            <q-card-section class="q-gutter-y-md q-pt-none">
              <q-input
                v-for="(name, index) in $tm('names')"
                :key="index"
                :label="name"
                :model-value="input.names[index]"
                v-model.trim="input.names[index]"
                square
                dense
                type="text"
                label-color="white"
                :name="`names[${index}]`"
                :lazy-rules="true"
                :rules="[v => v && v.length > 0]"
                @blur="findByName(input.names[index])"
                hide-bottom-space
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          group="group"
          icon="park"
          label="Trouver un parc"
          caption="Vous pourrez l'associer à d'autres plûtard"
          header-class="text-white"
        >
          <q-card flat square class="q-pb-md">
            <SelectArea
              :rows-per-page-options="[5, 10]"
              flat
              square
              @update:modelValue="input.areaId = $event[0]?.id"
            />
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          group="group"
          icon="collections"
          label="Images de représentation"
          header-class="text-white"
        >
          <q-carousel
            v-model="slide"
            animated
            control-color="amber"
            navigation
            infinite
            height="300px"
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
            label="choisir"
            @click="$refs.file.$el.click()"
            no-caps
            color="white"
            class="q-mt-md full-width"
          />
        </q-expansion-item>
        <q-expansion-item
          group="group"
          icon="more_horiz"
          label="Informations supplementaires"
          header-class="text-white"
        >
          <q-card class="q-mt-lg q-pa-md q-gutter-y-md">
            <div class="row justify-between">
              <q-checkbox
                :model-value="input.endangered"
                v-model="input.endangered"
                label="Espèce menacée"
              />
              <q-checkbox
                :model-value="input.endemic"
                v-model="input.endemic"
                label="Espèce endemique"
              />
            </div>
            <q-input
              v-for="(c, i) in input.characteristics"
              :key="i"
              :model-value="c"
              v-model="input.characteristics[i]"
              autogrow
              :label="`Caractéristiques en ${($tm('languages')[i]).label.toLowerCase()}`"
              label-color="white"
            />
          </q-card>
        </q-expansion-item>
      </q-form>
      <template v-slot:footer>
        <div class="text-red" v-if="exist">
          Le nom <b>{{existName}}</b> existe déjà
          <q-btn icon="more_vert" flat dense>
            <q-menu>
              <LivingBeingExist :item="livingBeing" />
            </q-menu>
          </q-btn>
        </div>
        <q-btn
          flat
          :label="$t('create.btn')"
          no-caps
          color="white"
          @click="validate"
          :disable="input.areaId < 1 || exist || fLoading"
          :loading="fLoading"
        />
      </template>
    </MovableCard>
  </q-dialog>
</template>

<script lang="ts">
import {defineComponent, ref, defineAsyncComponent} from 'vue';
import MovableCard from 'components/shared/MovableCard.vue';
import {useImageLoader} from 'src/graphql/utils/preview';
import {useValidationError} from 'src/graphql/utils/utils';
import {useCreateLivingBeing} from 'src/graphql/living-being/create-living-being';
import {useFindLivingBeingByName} from 'src/graphql/living-being/find-living-being-by-name';

export default defineComponent({
  name: 'CreateLivingBeing',
  components: {
    MovableCard,
    SelectArea: defineAsyncComponent(() => import('components/area/SelectArea.vue')),
    LivingBeingExist: defineAsyncComponent(() => import('./LivingBeingExist.vue'))
  },
  props: {
    areaId: Number
  },
  setup() {
    return {
      ...useImageLoader(),
      slide: ref(0),
      ...useValidationError(),
      ...useCreateLivingBeing(),
      ...useFindLivingBeingByName()
    }
  }
})
</script>

<style scoped>

</style>
