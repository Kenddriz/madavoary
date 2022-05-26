<template>
  <Alert icon="visibility" :count="count">
   <div class="q-pb-md">Abonnées</div>
  </Alert>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Alert from '../shared/Alert.vue';

  export default defineComponent({
    name: 'SuscribersCount',
    components: { Alert },
    setup() {
      return {
      }
    }
  });
</script>

<style scoped>

</style>
