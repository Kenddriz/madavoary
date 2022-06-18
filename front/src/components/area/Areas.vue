<template>
  <div class="row justify-around bg-primary q-pa-md">
    <router-link
      v-for="area in areas"
      :to="`/area/${area.id}`"
      :key="area.id"
      class="no-text-decoration col-12 col-sm-6 col-md-3 text-white q-pb-sm link"
      exact
      active-class="text-amber"
    >
      <div>
        <q-avatar size="sm" color="tertiary">{{ area.id }}</q-avatar>
        {{ area.name }}
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';

  export default defineComponent({
    name: 'Areas',
    props: ['areas'],
  });
</script>

<style lang="scss" scoped>

  .link:hover {
    padding: 5px;
    background: #ffc107;
    color: #fff;
    opacity: 1;
  }
</style>
