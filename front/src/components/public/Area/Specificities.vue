<template>
    <q-card
      class="bg-secondary"
      style="border-top-right-radius: 80px; border-bottom-left-radius: 80px"
    >
      <q-card-section class="text-h5">
        {{ $tm(`parks.${page}.specificities.title`) }}
      </q-card-section>
      <q-card-section>
        <ordered-list :items="$tm(`parks.${page}.specificities.body`)" />
      </q-card-section>
    </q-card>
</template>

<script lang="ts">
  import OrderedList from '../../shared/OrderedList.vue';

  export default {
    name: 'Specificities',
    props: {
      page: String
    },
    components: {
      OrderedList
    }
  };
</script>

<style scoped>

</style>
