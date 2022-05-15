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
      <div class="flex items-start q-gutter-md">
        <q-card
          flat
          bordered
          style="height: 80px; width: 80px"
          class="bg-primary cursor-pointer"
          v-ripple
          @click="resetSelected()"
        >
          <q-icon class="absolute-center" size="20px" name="account_tree" />
        </q-card>

        <q-card
          flat
          bordered
          style="height: 80px; width: 80px"
          class="bg-primary cursor-pointer"
          v-ripple
          @click="setSelected()"
        >
          <q-icon class="absolute-center" size="30px" name="arrow_drop_up" />
        </q-card>

        <q-card
          flat
          bordered
          v-for="classifier in children"
          :key="classifier.id"
          style="height: 80px;"
          class="bg-primary flex column items-center q-pa-md cursor-pointer"
          v-ripple
          @click="setSelected(classifier)"
        >
          <div>{{ classifier.label }}</div>
          <small> {{ $tm("classification.classifiers")[classifier.level]}} </small>
        </q-card>
      </div>

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
  import { defineComponent, computed, reactive, ref } from 'vue';
  import { useClassifiers } from '../graphql/classifier/classifiers';
  import {Classifier} from 'src/graphql/types';
  const defaultSelected = {
    id: null,
    label: '',
    level: -1,
    translations: [],
    parentId: null,
  }
  export default defineComponent({
    name: 'classifiers-list',
    setup() {
      const { loading, classifiers } = useClassifiers();
      const selected = reactive({ ...defaultSelected });
      const tabs = ref<Classifier[]>([]);
      function onSelectTab(index: number) {
        tabs.value.splice(index + 1);
        Object.assign(selected, tabs.value[index]);
      }
      function resetSelected() {
        tabs.value.length = 0;
        Object.assign(selected, defaultSelected);
      }
      function setSelected(parent: any = null) {
        if(!parent) {
          parent = classifiers.value.find(c => c.id == selected.parentId);
          tabs.value.pop();
        } else tabs.value.push(parent);
        Object.assign(selected, parent || defaultSelected);
      }
      const children = computed(() => classifiers.value.filter((c) => c.parentId === selected.id));
      return {
          loading,
          children,
          setSelected,
          resetSelected,
          tabs,
          selected,
          onSelectTab,
        }
    }
  })
</script>

<style scoped>

</style>
