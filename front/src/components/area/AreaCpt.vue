<template>
  <div class="col-md-6 col-sm-12 q-pa-sm">
    <AreasTable />
  </div>
  <div class="col-md-6 col-sm-12 q-pa-sm">
    <AreaDetails />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AreasTable from './AreasTable.vue';
import AreaDetails from './AreaDetails.vue';

export default defineComponent({
  name: 'AreaCpt',
  components: { AreasTable, AreaDetails }
})
</script>

<style scoped>

</style>
