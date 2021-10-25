<template>
  <q-page class="row bg-dark items-center">
    <div class="col-md-6 col-sm-12 q-pa-sm">
      <CollectionsTable />
    </div>
    <div class="col-md-6 col-sm-12 q-pa-sm">
      <CollectionDetails />
    </div>
  </q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import CollectionsTable from 'components/collection/CollectionsTable.vue';
import CollectionDetails from 'components/collection/CollectionDetails.vue';

export default defineComponent({
  name: 'Collection',
  components: { CollectionsTable, CollectionDetails }
})
</script>

<style scoped>

</style>
