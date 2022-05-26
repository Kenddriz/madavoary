<template>
  <div class="cursor-pointer" no-caps flat v-if="true">
    <q-badge color="orange" style="width: 20px" rounded>
      <q-icon name="check" size="10px" />
    </q-badge>
    charlin@gmail.com
    <q-tooltip class="bg-primary" :offset="[8, 8]">
      <div>Numéro : </div>
      <div> Abonné(e) le </div>
    </q-tooltip>
  </div>
  <q-form v-else>
    <q-toolbar class="bg-primary text-white rounded-borders">
      <q-input class="full-width" label-slot>
        <template v-slot:label>
          <div class="row items-center all-pointer-events text-white">
            <q-icon class="q-mr-xs" size="24px" name="mail" />
            Email
          </div>
        </template>
      </q-input>
      <q-btn
        type="submit"
        rounded
        text-color="dark"
        color="warning"
        label="S'abonner"
        no-caps unelevated
      />
    </q-toolbar>
  </q-form>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'CreateSuscription',
    setup() {
      return {
      }
    }
  });
</script>

<style scoped>

</style>
