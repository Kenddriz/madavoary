<template>
    <q-form
      class="row q-pb-lg"
      autocorrect="off"
      autocapitalize="off"
      autocomplete="off"
      spellcheck="false"
      ref="inputForm"
      @submit.prevent="onSubmit"
      autofocus
    >

      <slot></slot>
      <q-card flat class="col-12 col-md-4 bg-primary">
        <q-card-section>
          Nominalisations
        </q-card-section>
        <q-card-section class="q-gutter-y-md">
          <q-input
            v-for="(lab, index) in nameLabels"
            :key="index"
            color="orange"
            outlined
            :model-value="names[index]"
            @update:model-value="updateArray(index, $event)"
            :label="$t(`livingBeing.${lab}`)"
            hide-bottom-space
            hide-hint
            :lazy-rules="index === 0"
            :rules="[ val => index > 0 || index === 0 && !!val ]"
            dense
          />
          <q-checkbox
            color="orange"
            keep-color
            @update:model-value="$emit('update:endemic',$event)"
            :model-value="endemic"
            :label="$t('livingBeing.endemic')"
          />
        </q-card-section>
      </q-card>

      <q-card flat class="col-12 col-md-4 bg-primary">
        <q-card-section>
          Descriptions
        </q-card-section>
        <q-card-section class="q-gutter-y-md">
          <q-input
            v-for="(desc, index) in $tm('livingBeing.descriptions')"
            :key="index"
            color="orange"
            outlined
            autogrow
            :model-value="descriptions[index]"
            @update:model-value="updateArray(index, $event, 'descriptions')"
            :label="desc"
          />
        </q-card-section>
        <q-card-section>
          Parcs
        </q-card-section>
        <q-card-section>
          <q-select
            label="Parcs où l'on trouve"
            :model-value="areaIds"
            @update:model-value="$emit('update:areaIds', $event)"
            multiple
            option-label="name"
            option-value="id"
            color="orange"
            use-input
            fill-input
            :options="areas"
            popup-content-class="bg-primary q-card--bordered"
            options-dense
            hide-bottom-space
            outlined
            map-options
            emit-value
            use-chips
            :lazy-rules="true"
            :rules="[ val => val.length > 0 ]"
            hide-dropdown-icon
            hide-hint
          />
        </q-card-section>
      </q-card>

      <q-card flat class="col-12 bg-primary">
        <q-card-section>
          Classifications scientifiques
        </q-card-section>
        <q-card-section v-if="!loading" class="flex justify-between items-start q-pa-sm">
          <ClassifiersInput
            :items="getOptions(index)"
            v-for="(field, index) in $tm(`classification.classifiers`)"
            :key="index"
            :label="field"
            :model-value="classifierIds[index]"
            @update:model-value="updateArray(index, $event, 'classifierIds')"
            :class="`q-ma-sm ${$q.screen.xs ? 'full-width q-mx-md' : ''}`"
          />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            type="submit"
            no-caps
            outline
            size="lg"
            color="orange"
            style="min-width: 50%"
          >
            <slot name="button"></slot>
          </q-btn>
        </q-card-actions>
      </q-card>

    </q-form>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import {useClassifiers} from 'src/graphql/classifier/classifiers';
    import ClassifiersInput from 'components/classifier/classifiers-input.vue';
    import {useAreas} from 'src/graphql/area/areas';

    export default defineComponent({
      name: 'living-being-form',
      components: { ClassifiersInput },
      props: [
        'descriptions',
        'endemic',
        'areaIds',
        'classifierIds',
        'names',
      ],
      setup(props, { emit }) {
        const {classifiers,loading} = useClassifiers();
        const inputForm = ref<any>(null);
        function getOptions(level: number) {
          return classifiers.value.filter(c => c.level === level);
        }
        function updateArray (index: number, value: string, key = 'names') {
          const data = props as Record<string, any>;
          const names = [...data[key]];
          names[index] = value;
          emit(`update:${key}`, names);
        }
        function onSubmit() {
          inputForm.value.validate().then((success: boolean) => {
            if(success) {
              inputForm.value.resetValidation();
              emit('validate');
            }
          })
        }
        return {
          getOptions,
          ...useAreas(),
          updateArray,
          nameLabels: [ 'scientific', 'locals', 'french', 'english'],
          inputForm,
          onSubmit,
          loading,
        }
      }
    })
</script>

<style lang="scss" scoped>
  .q-card--bordered {
    border-color: #525d73 !important;
  }
</style>
