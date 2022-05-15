<template>
    <q-page class="q-pa-md">
      <AreaForm class="q-my-lg" />
    </q-page>
</template>

<script  lang="ts">
    import {defineComponent} from 'vue';
    import AreaForm from 'components/area-form.vue';
    export default defineComponent({
      name: 'areas-creation',
      components: { AreaForm },
      setup() {

      }
    })
</script>

<style scoped>

</style>
