<template>
  <q-form
    autocorrect="off"
    autocapitalize="off"
    autocomplete="off"
    spellcheck="false"
    @validation-error="validationError"
    ref="formRef"
    class="row"
  >
    <div class="col-12 col-md-6 q-pa-sm">
      <slot></slot>
    </div>

    <div class="col-12 col-md-6 q-pa-sm q-gutter-y-md">
      <div class="text-subtitle1">Type d'aventure</div>
      <CollectionSubjects
        class="q-mt-none"
        :nullable="false"
        :model-value="natureId"
        @update:model-value="$emit('update:natureId', $event)"
      />
      <q-input
        :model-value="naming"
        @update:model-value="$emit('update:naming', $event)"
        square
        dense
        type="text"
        label="Titre ou nom"
        color="orange"
        :lazy-rules="true"
        :rules="[v => v && v.length]"
        no-error-icon
        hide-bottom-space
        name="naming"
      />
      <q-input
        :model-value="place"
        @update:model-value="$emit('update:place', $event)"
        square
        dense
        type="text"
        :label="$t('place')"
        :lazy-rules="true"
        :rules="[v => v && v.length]"
        no-error-icon
        hide-bottom-space
        name="place"
        color="orange"
      />
      <q-input
        :model-value="description"
        @update:model-value="$emit('update:description', $event)"
        outlined
        :label="$t('description')"
        type="textarea"
        spellcheck="false"
        color="orange"
        :lazy-rules="true"
        :rules="[v => v && v.length]"
        no-error-icon
        hide-bottom-space
        name="description"
      />
    </div>

    <q-card-actions align="center" class="col-12">
      <q-btn
        color="orange"
        @click="validate"
        no-caps
      >
        <slot name="button"></slot>
      </q-btn>
      <q-btn
        color="white"
        flat
        type="reset"
        no-caps
        :label="$t('reset')"
        @click="$emit('reset')"
      />
    </q-card-actions>
  </q-form>
</template>

<script lang="ts">
  import {defineComponent, ref} from 'vue';
  import {useValidationError} from 'src/graphql/utils/utils';
  import CollectionSubjects from './adventure-subjects.vue';
  export default defineComponent({
    name: 'adventure-form',
    emits: [
      'validate',
      'reset',
      'update:naming',
      'update:place',
      'update:description',
      'update:natureId',
    ],
    props: [
      'naming',
      'place',
      'description',
      'natureId',
    ],
    components: { CollectionSubjects },
    setup(_, { emit }) {
      const formRef = ref<any>(null);
      function validate () {
        formRef.value.validate().then((success: boolean) => {
          if (success) emit('validate');
        })
      }

      return {
        formRef,
        validate,
        ...useValidationError(),
      }
    }
  })
</script>

<style scoped>

</style>
