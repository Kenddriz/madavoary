<template>
  <div class="row justify-around bg-primary q-pa-md">
    <router-link
      v-for="area in areas"
      :to="`/area/${area.id}`"
      :key="area.id"
      class="no-text-decoration col-2 col-md-3 text-white q-pb-sm link"
      active-class="link"
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
  import {useAreas} from 'src/graphql/area/areas';

  export default defineComponent({
    name: 'Areas',
    setup() {
      return {
        ...useAreas(),
      }
    }
  });
</script>

<style lang="scss" scoped>

  .link:hover {
    padding: 5px;
    background: orange;
    color: #fff;
    opacity: 1;
  }
</style>
