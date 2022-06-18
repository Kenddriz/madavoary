<template>
    <q-page class="q-pa-md">
      <q-tabs
        dense
        :model-value="selected.id"
        inline-label
        outside-arrows
        mobile-arrows
        class="text-white q-mb-lg"
        v-if="tabs.length"
      >
        <template
          v-for="(tab, index) in tabs"
          :key="index"
        >
          <q-tab
            v-if="index > 0"
            :name="tab.id"
            :label="tab.label"
            @click="onSelectTab(index)"
            icon="chevron_right"
          />
          <q-tab
            v-else
            :name="tab.id"
            :label="tab.label"
            @click="onSelectTab(index)"
          />
        </template>
      </q-tabs>

      <classifiers
        class="items-start wrap"
        v-model="selected"
        @tabs-pop="tabs.pop()"
        @tabs-push="tabs.push($event)"
        @reset="tabs.length = 0"
      />

      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-fab
          vertical-actions-align="right"
          color="orange"
          glossy
          icon="keyboard_arrow_up"
          direction="up"
          padding="sm"
          active-icon="keyboard_arrow_down"
        >
          <q-fab-action
            label-position="right"
            color="secondary"
            icon="edit"
            label="Editer"
            style="width: 130px"
          />
          <q-fab-action
            color="secondary"
            label-position="right"
            icon="delete"
            label="Supprimer"
            style="width: 130px"
          />
          <q-fab-action
            color="secondary"
            label-position="right"
            icon="add"
            label="Nouveau"
            style="width: 130px"
          />
        </q-fab>
      </q-page-sticky>
    </q-page>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import {Classifier} from 'src/graphql/types';
  import classifiers from 'components/classifier/classifiers.vue';
  import {defaultSelected} from 'src/graphql/classifier/classifiers';

  export default defineComponent({
    name: 'classifiers-list',
    components: { classifiers },
    setup() {
      const selected = ref({ ...defaultSelected });
      const tabs = ref<Classifier[]>([]);
      function onSelectTab(index: number) {
        tabs.value.splice(index + 1);
        selected.value = tabs.value[index];
      }
      return {
          tabs,
          selected,
          onSelectTab,
        }
    }
  })
</script>

<style scoped>

</style>
