<template>
  <div class="col-md-6 col-sm-12 q-pa-sm">
    <SpeciesTable />
  </div>
  <div class="col-md-6 col-sm-12 q-pa-sm">
    <SpeciesDetails />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import SpeciesTable from './SpeciesTable.vue';
import SpeciesDetails from './SpeciesDetails.vue';

export default defineComponent({
  name: 'SpeciesCpt',
  components: { SpeciesTable, SpeciesDetails }
})
</script>

<style scoped>

</style>
