<template>
    <q-card flat class="bg-secondary">
      <q-card-section align="center">
        <q-img src="tarif_visit.svg" width="280px" />
        <h3 class="text-h5 q-mb-none">{{ $tm('parks.tariffs.title') }} </h3>
        <span class="text-caption">[ {{ $tm('parks.tariffs.caption')}} ]</span>
      </q-card-section>

      <q-separator inset spaced />

      <q-card-section class="row justify-center q-pa-md q-gutter-sm">
        <q-card
          flat
          v-for="(tVisit, index) in $tm('parks.tariffs.details')"
          :key="index"
          class="bg-primary col-12 col-md-5"
        >
          <q-card-section class="text-center text-bold text-subtitle1">
            {{ tVisit.nationality }}
          </q-card-section>
          <q-separator inset spaced />
          <q-card-section class="row justify-around col-12">
            <div v-for="(t, i) in tVisit.body" :key="i">
              <span>{{ t.label }} </span>
              <q-slider
                :model-value="numberFrom(t.value)"
                :min="0"
                :max="tVisit.body.reduce((s, c) => s += numberFrom(c.value), 0)"
                :color="t.color"
                readonly
                vertical
                reverse
                :label-value="t.value"
                label-always
              />
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>

      <q-separator inset spaced />

      <q-card-section class="text-blue-grey-1" align="center">
        <q-avatar size="md" icon="lightbulb" color="orange" />
        {{ $tm('parks.tariffs.remark') }}
      </q-card-section>

      <q-card-section align="center">
        <p style="max-width: 800px" class="text-left">
          {{ $tm('parks.tariffs.body') }}
        </p>
      </q-card-section>
    </q-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import {numberFrom} from 'src/graphql/utils/extract';

  export default defineComponent({
    name: 'Tariffs',
    setup() {
      return {
        numberFrom
      }
    }
  });
</script>

<style scoped>

</style>
