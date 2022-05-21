<template>
  <q-dialog ref="dialogRef">
    <MovableCard resizable>
      <template v-slot:title>
        {{$t(`loading.${area ? 'update' : 'create'}`).replace('...', '')}}
      </template>
      <q-form
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        @validation-error="validationError"
        ref="formRef"
      >
        <q-expansion-item :label="$t('area.banner')">
          <q-card bordered>
            <ImageInput
              v-model="banner"
              :src="bSrc"
              height="200px"
              @upload="updateBanner($event[0], area.id)"
            />
          </q-card>
        </q-expansion-item>
        <q-expansion-item :label="$t('description')">
          <q-card bordered class="q-pa-sm q-gutter-y-sm">
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
            />
            <q-item-section class="bordered-bottom">
              <q-item-label>{{$t('area.type')}}</q-item-label>
              <q-item-label class="text-white" caption>
                <q-radio
                  color="white"
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
            <q-input
              :model-value="input.region"
              v-model="input.region"
              square
              dense
              type="text"
              :label="$t('region')"
              label-color="white"
              :lazy-rules="true"
              :rules="[v => v && v.length]"
              no-error-icon
              hide-bottom-space
              name="region"
            />
            <q-input
              dense
              :model-value="input.surface"
              v-model.number="input.surface"
              :label="$t('surface')"
              type="number"
              spellcheck="false"
              label-color="white"
              :lazy-rules="true"
              :rules="[v => v && v >= 0]"
              no-error-icon
              hide-bottom-space
              name="surface"
              suffix="ha"
            />
          </q-card>
        </q-expansion-item>
        <q-expansion-item :label="$t('peripherals')">
          <q-card bordered class="q-gutter-y-sm q-pa-sm">
            <div v-for="(p, index) in input.peripherals" :key="index" class="row">
              <q-input
                label-color="white"
                v-model.number="p.city"
                :model-value="p.city"
                dense
                :label="$t('city') + ' ' + (index + 1)"
                class="col"
              />
              <q-input
                type="number"
                label-color="white"
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
                dense
                round
                icon="add"
                @click="addCity"
                color="teal"
              />
            </q-card-actions>
          </q-card>
        </q-expansion-item>
      </q-form>
      <template v-slot:footer>
        <q-btn
          :loading="loading"
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
import {defineComponent, reactive, ref} from 'vue';
import {CreateAreaInput, Peripheral} from 'src/graphql/types';
import MovableCard from 'components/shared/MovableCard.vue';
import {notify, useValidationError} from 'src/graphql/utils/utils';
import ImageInput from 'components/shared/ImageInput.vue';
import {useI18n} from 'vue-i18n';
import {useUpdateAreaBanner} from 'src/graphql/area/updateAreaBanner';

export default defineComponent({
  name: 'AreaForm',
  components: { MovableCard, ImageInput },
  props: ['area'],
  setup(props) {
    const input = reactive<CreateAreaInput>({
      name: '',
      type: 0,
      peripherals: [],
      region: '',
      surface: 0
    });
    const { t } = useI18n();
    const banner = ref<any[]>([]);
    if (props.area) {
      Object.keys(input).forEach( (key: string) => {
        let data = props.area[key];
        if(key === 'peripherals')data = data.map((p: Peripheral) => ({ city: p.city, distance: p.distance}));
        Object.assign(input, { [key]: data });
      });
    }
    const formRef = ref<any>(null);
    function addCity() {
      input.peripherals.push({ city: '', distance: 25 })
    }
    function removeCity(index: number) {
      input.peripherals.splice(index, 1);
    }
    function validate() {
      formRef.value.validate().then((success: boolean) => {
        if (success) {
          if(!banner.value.length && !props.area) notify(t('area.bannerMissing'), 'red');
        }
      })
    }
    return {
      input,
      addCity,
      removeCity,
      ...useValidationError(),
      formRef,
      validate,
      banner,
      bSrc: props.area?.banner ? process.env.uri + 'areas/' + props.area.banner : '',
      ...useUpdateAreaBanner()
    }
  }
})
</script>

<style scoped>

</style>
