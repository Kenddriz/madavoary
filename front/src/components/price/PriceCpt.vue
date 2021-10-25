<template>
  <q-card class="q-pa-lg q-mb-lg text-center text-h6" flat bordered>
    Coût de la visite étrangère = 5 / 9 de celle de Malagasy
  </q-card>
  <q-markup-table separator="cell" bordered flat>
    <thead>
      <tr>
        <th colspan="3">
          <div class="text-h6 text-left">
            Prix d'entrée dans les parcs
          </div>
        </th>
      </tr>
      <tr>
        <th>Nationalité\Tranche d'âge</th>
        <th>Enfant</th>
        <th>Adulte</th>
      </tr>
    </thead>
    <tbody>
      <tr class="q-tr--no-hover">
        <td>Malagasy</td>
        <td>
          <q-input
            type="number"
            :model-value="12000"
            borderless
            input-class="text-center"
          />
        </td>
        <td>
          <q-input
            type="number"
            :model-value="12000"
            borderless
            input-class="text-center"
          />
        </td>
      </tr>
      <tr class="q-tr--no-hover">
        <td>Etrangère</td>
        <td>
          <q-input
            type="number"
            :model-value="12000"
            borderless
            input-class="text-center"
          />
        </td>
        <td>
          <q-input
            type="number"
            :model-value="12000"
            borderless
            input-class="text-center"
          />
        </td>
      </tr>
    </tbody>
  </q-markup-table>
  <q-btn
    no-caps
    outline
    rounded
    label="Enregistrer les modifications"
    class="q-mt-lg full-width"
    icon="save"
  />
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'PriceCpt'
})
</script>

<style scoped>
  td { text-align: center }
</style>
