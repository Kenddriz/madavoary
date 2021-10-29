<template>
  <q-btn
    outline
    color="brown"
    no-caps
    label="Nouvelle"
    text-color="white"
    icon="add"
    @click="show = true"
  />
  <q-dialog seamless v-model="show">
    <MovableCard resizable class="bg-primary" style="padding-bottom: 70px;">
      <template v-slot:title>
        Nouvelle collection
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
          label="Informations générales"
          default-opened
          header-class="text-white"
        >
          <q-card class="q-mt-lg">
            <q-card-section class="q-gutter-y-md q-pt-none">
              <CollectionSubjects :nullable="false" v-model="input.detail.natureId" />
              <q-input
                :model-value="input.detail.naming"
                v-model="input.detail.naming"
                square
                dense
                type="text"
                label="Titre ou nom"
                label-color="white"
                :lazy-rules="true"
                :rules="[v => v && v.length]"
                no-error-icon
                hide-bottom-space
                name="naming"
              />
              <q-input
                :model-value="input.detail.place"
                v-model="input.detail.place"
                square
                dense
                type="text"
                :label="$t('place')"
                label-color="white"
                :lazy-rules="true"
                :rules="[v => v && v.length]"
                no-error-icon
                hide-bottom-space
                name="place"
              />
              <q-input
                :model-value="input.detail.description"
                v-model="input.detail.description"
                outlined
                :label="$t('description')"
                type="textarea"
                spellcheck="false"
                label-color="white"
                :lazy-rules="true"
                :rules="[v => v && v.length]"
                no-error-icon
                hide-bottom-space
                name="description"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          group="group"
          icon="explore"
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
            :model-value="input.images"
            v-model="input.images"
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
      </q-form>
      <template v-slot:footer>
        <q-card-actions align="right" class="full-width bg-teal q-pa-none q-pr-md">
          <q-btn
            flat
            :label="$t('create.btn')"
            no-caps
            color="white"
            @click="validate"
          />
          <q-btn
            color="white"
            flat
            type="reset"
            no-caps
            :label="$t('reset')"
            @click="reset"
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
import {useCreateCollection} from 'src/graphql/collection/create-collection';
import CollectionSubjects from 'components/collection/CollectionSubjects.vue';
import {useValidationError} from 'src/graphql/utils/utils';

export default defineComponent({
  name: 'CreateCollection',
  components: { MovableCard, CollectionSubjects },
  setup() {
    return {
      ...useImageLoader(),
      slide: ref(0),
      show: ref(false),
      ...useCreateCollection(),
      ...useValidationError()
    }
  }
})
</script>

<style scoped>

</style>
