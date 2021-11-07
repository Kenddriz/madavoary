<template>
  <q-btn
    outline
    color="brown"
    no-caps
    :label="$t('create.btn')"
    text-color="white"
    icon="add"
    @click="show = true"
  />
  <q-dialog seamless v-model="show">
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
          icon="explore"
          label="Images de représentation"
          header-class="text-white"
          default-opened
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
          icon="explore"
          label="Nominalisation"
          header-class="text-white"
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
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          group="group"
          icon="explore"
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
        <q-card-actions align="right" class="full-width bg-teal q-pa-none q-pr-md">
          <q-btn
            flat
            :label="$t('create.btn')"
            no-caps
            color="white"
          />
        </q-card-actions>
      </template>
    </MovableCard>
  </q-dialog>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import MovableCard from 'components/shared/MovableCard.vue';
import {useImageLoader} from 'src/graphql/utils/preview';
import {useValidationError} from 'src/graphql/utils/utils';
import {useCreateLivingBeing} from 'src/graphql/living-being/create-living-being';

export default defineComponent({
  name: 'CreateLivingBeing',
  components: { MovableCard },
  setup() {
    return {
      ...useImageLoader(),
      slide: ref(0),
      show: ref(false),
      ...useValidationError(),
      ...useCreateLivingBeing()
    }
  }
})
</script>

<style scoped>

</style>
