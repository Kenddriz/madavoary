<template>
  <q-card class="bg-secondary">
    <q-card-section>
      <q-item>
        <q-item-section>
          <q-item-label>
            Somme pondérée d'abonnements
          </q-item-label>
          <q-item-label caption>
            5 dernières années
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <apexchart
        type="line"
        :series="[]"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'SubscriberYearly',
    setup() {
      return {
      }
    }
  });
</script>

<style scoped>

</style>
