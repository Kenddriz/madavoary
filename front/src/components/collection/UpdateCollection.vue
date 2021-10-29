<template>
  <q-dialog ref="dialogRef">
    <MovableCard resizable >
      <template v-slot:title>
        {{$t('loading.update').replace('...', '')}}
      </template>
      <q-form
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        @validation-error="validationError"
        ref="formRef"
        class="q-gutter-y-md q-pa-sm"
      >
        <CollectionSubjects :nullable="false" v-model="input.natureId" />
        <q-input
          :model-value="input.naming"
          v-model="input.naming"
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
          :model-value="input.place"
          v-model="input.place"
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
          :model-value="input.description"
          v-model="input.description"
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
      </q-form>
      <template v-slot:footer>
        <q-btn
          flat
          :label="$t('save')"
          no-caps
          color="white"
          @click="validate"
        />
      </template>
    </MovableCard>
  </q-dialog>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import MovableCard from '../shared/MovableCard.vue';
import {Collection} from 'src/graphql/types';
import {useDialogPluginComponent} from 'quasar';
import CollectionSubjects from 'components/collection/CollectionSubjects.vue';
import {useUpdateCollection} from 'src/graphql/collection/update-collection';
import {useValidationError} from 'src/graphql/utils/utils';

export default defineComponent({
  name: 'UpdateCollection',
  components: { MovableCard, CollectionSubjects },
  props: {
    collection: {
      type: Object as PropType<Collection>,
      required: true
    }
  },
  setup(props) {
    const { dialogRef } = useDialogPluginComponent()
    return {
      dialogRef,
      ...useUpdateCollection(props.collection),
      ...useValidationError()
    }
  }
})
</script>

<style scoped>

</style>
