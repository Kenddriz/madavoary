<template>
  <q-page class="bg-dark">
    <q-tabs
      v-model="tab"
      dense
      active-color="amber"
      indicator-color="amber"
      align="justify"
      no-caps
    >
      <q-tab
        v-for="(item, index) in $tm('dashboard.park')"
        :name="index"
        :label="item"
        :key="index"
      />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>

      <q-tab-panel class="q-pa-none row" :name="0">
        <AreaCpt />
      </q-tab-panel>

      <q-tab-panel class="q-pa-sm" :name="1">
        <PriceCpt />
      </q-tab-panel>

      <q-tab-panel class="q-pa-none row" :name="2">
        <SpeciesCpt />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import AreaCpt from 'components/area/AreaCpt.vue';
import SpeciesCpt from 'components/species/SpeciesCpt.vue';
import PriceCpt from 'components/price/PriceCpt.vue';

export default defineComponent({
  name: 'Park',
  components: { AreaCpt, SpeciesCpt, PriceCpt },
  setup() {
    return {
      tab: ref<number>(0)
    }
  }
})
</script>

<style scoped>

</style>
