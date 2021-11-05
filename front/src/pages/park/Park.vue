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
        Relief
      </q-tab-panel>

      <q-tab-panel class="q-pa-sm" :name="2">
        Hydraulic
      </q-tab-panel>

      <q-tab-panel class="q-pa-none row" :name="3">
        <LivingBeing />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import AreaCpt from 'components/area/Area.vue';
import LivingBeing from 'components/living-being/LivingBeing.vue';

export default defineComponent({
  name: 'Park',
  components: { AreaCpt, LivingBeing },
  setup() {
    return {
      tab: ref<number>(0)
    }
  }
})
</script>

<style scoped>

</style>
