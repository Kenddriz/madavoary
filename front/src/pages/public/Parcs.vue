<template>
  <Welcome :page="areaPage"/>

  <section>
    <Tariffs class="q-ml-md q-mr-md" />
  </section>

  <section class="q-ml-md q-mr-md">
    <ParkLocalisation :page="areaPage" />
  </section>

  <section class="row justify-center q-ml-md q-mr-md">
    <Specificities :page="areaPage" />
  </section>

  <section class="q-ml-md q-mr-md">
    <Habitat :page="areaPage" />
  </section>

  <section class="q-ml-md q-mr-md">
    <Biodiversity :page="areaPage" />
  </section>

  <section class="row justify-center q-ma-md">
    <Notice :page="areaPage" class="col" />
  </section>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import Tariffs from 'components/public/Area/Tariffs.vue';
  import { areaPage } from 'components/public/Area/areas';
  import { useRoute } from 'vue-router';
  import Welcome from 'components/public/Area/Welcome.vue';
  import ParkLocalisation from 'components/public/Area/ParkLocalisation.vue';
  import Specificities from 'components/public/Area/Specificities.vue';
  import Habitat from 'components/public/Area/Habitat.vue';
  import Biodiversity from 'components/public/Area/Biodiversity.vue';
  import Notice from 'components/public/Area/Notice.vue';

  export default defineComponent({
    name: 'Parcs',
    components: {
      Welcome,
      Tariffs,
      ParkLocalisation,
      Specificities,
      Habitat,
      Biodiversity,
      Notice

    },
    setup() {
      const { params } = useRoute();
      return {
        areaPage: computed(() => areaPage(Number(params.id)))
      }
    }
  });
</script>

<style lang="scss" scoped>
 section {
   margin-top: 40px;
 }
</style>
