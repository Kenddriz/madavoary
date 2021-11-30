<template>
  <q-page class="bg-dark">
    <q-splitter
      :model-value="splitterModel"
      v-model="splitterModel"
      style="height: 400px"
      :horizontal="$q.screen.lt.sm"
      v-if="classifiers.length"
      before-class="q-gutter-md q-pa-sm"
      after-class="flex items-center justify-center q-pa-sm"
      class="full-height"
    >

      <template v-slot:before>
        <q-input
          dense
          :model-value="filter"
          ref="filterRef"
          v-model="filter"
          label="Chercher un élément"
          @clear="filter = ''"
          clearable
          label-color="white"
          clear-icon="close"
          spellcheck="false"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-tree
          :nodes="makeTree(classifiers, null)"
          node-key="id"
          selected-color="warning"
          v-model:selected="selected"
          :filter="filter"
          :filter-method="filterMethod"
          :no-results-label="$t('noData')"
          accordion
        >
          <template v-slot:default-header="prop">
            <div @click="moveClassifier(prop.node.id)" class="row items-center q-gutter-x-md full-width">
              <span>{{ prop.node.label }}</span>
              <q-icon
                v-if="moveInput.id > 0 && moveInput.id !== prop.node.id && prop.node.id !== moveInput.parentId"
                name="content_paste"
                size="xs"
              />
            </div>
          </template>
          <template v-slot:default-body="prop">
            <q-btn
              no-caps
              flat
              rounded
              size="sm"
              v-if="prop.node.level < 31"
              icon="add"
              color="white"
              @click="createClassifier(findClassifier(prop.node.id))"
            />
            <q-btn
              no-caps
              flat
              rounded
              size="sm"
              icon="edit"
              color="white"
              @click="updateClassifier(prop.node)"
            />
            <q-btn
              no-caps
              flat
              rounded
              size="sm"
              icon="delete_forever"
              color="white"
            />
            <q-btn
              no-caps
              flat
              rounded
              size="sm"
              icon="content_cut"
              :color="moveInput.id === prop.node.id ? 'positive' : 'white'"
              @click="setCutId(prop.node.id, prop.node.parentId)"
            />
          </template>
        </q-tree>
        <q-btn
          no-caps
          outline
          size="sm"
          color="white"
          label="Nouveau domaine"
          @click="createClassifier()"
        />
      </template>

      <template
        v-if="cl = findClassifier(selected)"
        v-slot:after
      >
        <q-card bordered>
          <q-card-section class="text-subtitle1">
            Détails de séléction
          </q-card-section>
          <q-separator />
          <q-card-section>
            <p>
              {{$tm('classification.classifiers')[cl.level]}} : {{cl.label}}
            </p>
            <p class="text-blue-grey-13">Traductions</p>
            <p v-for="(lang, index) in $tm('languages')" :key="index">
              {{lang.label}} : {{cl.translations[index]}}
            </p>
          </q-card-section>
          <q-separator />
          <q-card-actions align="between">
            <q-btn
              no-caps
              flat
              rounded
              v-if="cl.level < 31"
              icon="add"
              color="white"
              @click="createClassifier(cl)"
            />
            <q-btn
              no-caps
              flat
              rounded
              icon="edit"
              color="white"
              @click="updateClassifier(cl)"
            />
            <q-btn
              no-caps
              flat
              rounded
              icon="delete_forever"
              color="white"
            />
          </q-card-actions>
        </q-card>
      </template>
    </q-splitter>
    <NoData :loading="loading" :total-items="classifiers.length" v-else>
      <br />
      <q-btn
        no-caps
        outline
        color="white"
        icon="add"
        label="Nouveau domaine"
        @click="createClassifier()"
      />
    </NoData>
  </q-page>
</template>

<script lang="ts">
import {defineAsyncComponent, defineComponent, ref} from 'vue';
import NoData from 'components/shared/NoData.vue';
import {useClassifiers} from 'src/graphql/classifier/classifiers';
import {makeTree} from 'src/graphql/utils/utils';
import {useQuasar} from 'quasar';
import {useMoveClassifier} from 'src/graphql/classifier/move.classifier';
import {Classifier} from 'src/graphql/types';

export default defineComponent({
  name: 'Classification',
  components: {
    NoData,
  },
  setup() {
    const filter = ref('');
    const { dialog } = useQuasar();
    return {
      splitterModel: ref(50),
      filter,
      filterMethod (node: any, filter: string) {
        const filt = filter.toLowerCase()
        return node.label && node.label.toLowerCase().indexOf(filt) > -1
      },
      ...useClassifiers(),
      makeTree,
      createClassifier: (item: any = undefined) => dialog({
        component: defineAsyncComponent(() => import('components/classifier/CreateClassifier.vue')),
        componentProps: { item }
      }),
      ...useMoveClassifier(),
      updateClassifier: (item: Classifier) => dialog({
        component: defineAsyncComponent(() => import('components/classifier/UpdateClassifier.vue')),
        componentProps: { item }
      })
    }
  }
})
</script>

<style scoped>

</style>
