<template>
  <q-card class="bg-secondary">
    <q-card-section class="text-h5 text-center">
      {{ $tm(`parks.${page}.habitat.title`) }}
    </q-card-section>
    <q-separator  inset spaced />
    <q-card-section class="row wrap justify-center q-gutter-md">
      <q-card
        bordered
        square
        flat
        class="bg-primary"
        v-for="(item, index) in $tm(`parks.${page}.habitat.body`)"
        :key="index"
        style="max-width: 300px"
      >
        <q-card-section align="center">
          <q-avatar square size="80px" color="teal" text-color="white">
            <q-icon :name="item.icon" />
          </q-avatar><br>
          <div class="text-subtitle2 q-pt-md">{{ item.title }}</div>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          {{ item.description }}
        </q-card-section>
      </q-card>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
  export default {
    name: 'Habitat',
    props: {
      page: String
    }
  };
</script>

<style scoped>

</style>
