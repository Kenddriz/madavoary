<template>
  <q-dialog ref="dialogRef">
    <MovableCard>
      <template v-slot:title>
        Mise à jour
      </template>
      <q-form
        @submit.prevent="updateClassifier"
        class="q-gutter-y-sm"
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
      >
        <q-input
          :model-value="input.label"
          v-model="input.label"
          label="Désignation scientifique"
          label-color="white"
          hide-bottom-space
          :lazy-rules="true"
          :rules="[v => v && v.length > 0]"
        />
        <div class="text-grey">Translations</div>
        <q-input
          v-for="(lang, index) in $tm('languages')"
          :key="index"
          :model-value="input.translations[index]"
          v-model="input.translations[index]"
          :label="lang.label"
          label-color="white"
          hide-bottom-space
        />
        <q-btn
          no-caps
          dense
          type="submit"
          label="Enregistrer"
          icon="save"
          outline
          color="white"
          rounded
          class="full-width"
          v-close-popup
        />
      </q-form>
    </MovableCard>
  </q-dialog>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import MovableCard from '../shared/MovableCard.vue';
import {useDialogPluginComponent} from 'quasar';
import {Classifier} from 'src/graphql/types';
import {useUpdateClassifier} from 'src/graphql/classifier/update.classifier';

export default defineComponent({
  name: 'UpdateClassifier',
  components: { MovableCard },
  props: {
    item: {
      type: Object as PropType<Classifier>,
      required: true
    }
  },
  setup(props) {
    const { dialogRef } = useDialogPluginComponent();
    return {
      dialogRef,
      ...useUpdateClassifier(props.item)
    }
  }
})
</script>

<style scoped>

</style>
