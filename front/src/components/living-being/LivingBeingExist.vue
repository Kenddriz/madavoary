<template>
  <q-list>
    <q-item-label header>Noms</q-item-label>
    <q-item>
      <q-item-section>
        <q-item-label>Noms locaux</q-item-label>
        <q-item-label caption>{{ item.localNames.join(' - ')}}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label>Noms Scientifique</q-item-label>
        <q-item-label caption>{{ item.names[0]}}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item-label header>Noms vernaculaires</q-item-label>
    <q-item>
      <q-item-section>
        <q-item-label>Anglais</q-item-label>
        <q-item-label caption>{{ item.names[1]}}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label>Français</q-item-label>
        <q-item-label caption>{{ item.names[2]}}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {LivingBeing} from 'src/graphql/types';

export default defineComponent({
  name: 'LivingBeingExist',
  props: {
    item: Object as PropType<LivingBeing>
  }
})
</script>

<style scoped>

</style>
