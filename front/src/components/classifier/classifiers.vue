<template>
  <div class="flex q-gutter-md">
    <q-card
      flat
      bordered
      class="bg-primary cursor-pointer"
      v-ripple
      @click="resetSelected()"
      style="height: 80px; width: 80px"
    >
      <q-icon class="absolute-center" size="20px" name="account_tree" />
    </q-card>

    <q-card
      flat
      bordered
      class="bg-primary cursor-pointer"
      v-ripple
      @click="setSelected()"
      style="height: 80px; width: 80px"
    >
      <q-icon class="absolute-center" size="30px" name="arrow_drop_up" />
    </q-card>

    <!--Selected-->
    <q-card
      flat
      bordered
      v-if="modelValue.id != null && showSelected"
      class="cursor-pointer flex items-center"
      style="height: 80px; min-width: 83px; border-color: var(--q-warning)!important;"
    >
      <div class="q-pa-sm text-center full-width">
        <div>{{ modelValue.label }}</div>
        <small> {{ $tm("classification.classifiers")[modelValue.level]}} </small>
      </div>
    </q-card>
    <!-- Children -->
    <q-card
      flat
      bordered
      v-for="classifier in children"
      :key="classifier.id"
      class="bg-primary cursor-pointer flex items-center"
      v-ripple
      style="height: 80px; min-width: 83px"
      @click="setSelected(classifier)"
    >
      <div class="q-pa-sm text-center full-width">
        <div>{{ classifier.label }}</div>
        <small> {{ $tm("classification.classifiers")[classifier.level]}} </small>
      </div>
    </q-card>
  </div>
</template>

<script lang="ts">
  import {computed, defineComponent, PropType} from 'vue';
  import {defaultSelected, useClassifiers} from 'src/graphql/classifier/classifiers';
  import {Classifier} from 'src/graphql/types';

  export default defineComponent({
    name: 'classifiers',
    props: {
      modelValue: {
        type: Object as PropType<Classifier>,
        default: () => defaultSelected
      },
      showSelected: {
        type: Boolean,
        default: false
      }
    },
    emits: ['update:modelValue', 'tabs-pop', 'tabs-push', 'reset'],
    setup(props, { emit }) {
      const { loading, classifiers } = useClassifiers();
      function resetSelected() {
        emit('reset');
        emit('update:modelValue', defaultSelected)
      }
      function setSelected(parent: any = null) {
        if(!parent) {
          parent = classifiers.value.find(c => c.id == props.modelValue?.parentId);
          emit('tabs-pop');
          //tabs.value.pop();
        } else emit('tabs-push', parent);//tabs.value.push(parent);
        emit('update:modelValue', parent || defaultSelected)
      }
      const children = computed(() => classifiers.value.filter((c: any) => c.parentId === props.modelValue?.id));
        return {
          loading,
          children,
          setSelected,
          resetSelected,
        }
    }
  })
</script>

<style lang="scss" scoped>
</style>
