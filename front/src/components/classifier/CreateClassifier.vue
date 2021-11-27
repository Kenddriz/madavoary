<template>
  <q-dialog ref="dialogRef">
    <MovableCard>
      <template v-slot:title>
        <q-item-label lines="1">
          {{ item ? 'Nouvel élément inférieur' : 'Nouveau ' + ($tm('classification.classifiers')[level + 1]).toLowerCase()}}
        </q-item-label>
      </template>
      <q-form
        @submit.prevent="createClassifier()"
        class="q-gutter-y-sm"
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
      >
        <template v-if="item">
          <q-item-section>
            <q-item-label>
              {{$tm('classification.classifiers')[level]}}
            </q-item-label>
            <q-item-label class="text-white" caption>
              {{item.label}}
            </q-item-label>
          </q-item-section>
          <q-select
            hide-bottom-space
            options-selected-class="text-warning"
            popup-content-class="bg-primary"
            popup-content-style="height: 200px"
            dense
            :model-value="modelIndex"
            v-model="modelIndex"
            use-input
            input-debounce="0"
            :options="options"
            @filter="filterFn"
            label="Choisir un niveau inférieur"
            emit-value
            map-options
            label-color="white"
            :fill-input="filterFn"
            style="max-width: 260px"
            options-dense
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  {{$t('noData')}}
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </template>
        <q-input
          dense
          hide-bottom-space
          label-color="white"
          label="Désignation scientifique"
          :lazy-rules="true"
          :rules="[v => v && v.length > 0]"
          v-model="input.label"
          :model-value="input.label"
        />
        <div class="text-grey">Translations</div>
        <q-input
          dense
          hide-bottom-space
          v-for="(lang, index) in $tm('languages')"
          :key="index"
          label-color="white"
          :label="lang.label"
          :model-value="input.translations[index]"
          v-model="input.translations[index]"
        />
        <q-btn
          no-caps
          dense
          type="submit"
          label="Ajouter"
          icon="add"
          outline
          color="white"
          rounded
          class="full-width"
        />
      </q-form>
    </MovableCard>
  </q-dialog>
</template>

<script lang="ts">
import {defineComponent, PropType, ref} from 'vue';
import MovableCard from '../shared/MovableCard.vue';
import {useDialogPluginComponent} from 'quasar';
import {Classifier} from 'src/graphql/types';
import {useI18n} from 'vue-i18n';
import {useCreateClassifier} from 'src/graphql/classifier/create.classifier';

export default defineComponent({
  name: 'CreateClassifier',
  components: { MovableCard },
  props: {
    item: Object as PropType<Classifier>
  },
  setup(props) {
    const { dialogRef } = useDialogPluginComponent();
    const { tm } = useI18n();
    const level = props?.item !== undefined ? props.item.level : -1;
    const stringOptions = (tm('classification.classifiers') as string[])
      .slice(level + 1)
      .map((label, value) => ({ label, value}));
    const options = ref(stringOptions);
    return {
      dialogRef,
      options,
      level,
      ...useCreateClassifier(level, props?.item?.id||null),
      filterFn (val: string, update: any) {
        if (val === '') {
          update(() => {
            options.value = stringOptions
          })
          return
        }
        update(() => {
          const needle = val.toLowerCase()
          options.value = stringOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
        })
      }
    }
  }
})
</script>

<style scoped>

</style>
