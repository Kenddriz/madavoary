<template>
  <q-page class="row">
    <div
      v-for="(m, index) in menu"
      :key="index"
      class="col-12 col-sm-4 flex flex-center q-pa-sm"
    >
      <q-btn
        class="no-box-shadow bg-primary"
        unelevated
        :to="`/private/${m.to}`"
        v-bind:class="{'full-width': $q.screen.lt.sm }"
      >
        <div>
          <q-icon :name="m.icon" /><br>
          {{ $tm('menu')[index] }}
        </div>
      </q-btn>
    </div>
  </q-page>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import {menu} from 'layouts/data';

  export default defineComponent({
      name: 'home-admin',
      setup() {
        return {
          menu
        }
      }
  })
</script>

<style lang="scss" scoped>
  .no-box-shadow {
    border-radius: 12px;
    height: 90px;
    width: 200px;
    border: 1px solid #2F528F;
  }
</style>
