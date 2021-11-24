<template>
  <q-page class="bg-dark q-pa-sm">
    <q-expansion-item
      v-for="(key, index) in classificationKeys"
      :key="index"
      group="keys"
      :default-opened="index === 0"
      :label="key"
    >
      <q-card flat bordered>
        <q-card-section :horizontal="$q.screen.gt.sm">
          <q-card-section class="col">
            Liste
          </q-card-section>
          <q-card-section class="col">
            Détails
          </q-card-section>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {classificationKeys} from 'src/graphql/utils/utils';

export default defineComponent({
  name: 'Classification',
  setup() {
    return {
      classificationKeys
    }
  }
})
</script>

<style scoped>

</style>
