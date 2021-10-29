<template>
  <div class="flex flex-center q-gutter-sm">
    <Alert
      v-for="(subject, index) in $tm('collection-subjects')"
      :key="index"
      :title="subject.title"
      :icon="subject.icon"
      :count="counts.find(c => c.natureId == subject.id)?.count||0"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, watch} from 'vue';
import {useCountCollections} from 'src/graphql/collection/count-collections';
import Alert from 'components/shared/Alert.vue';

export default defineComponent({
  name: 'CountCollections',
  components: { Alert },
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  setup(props){
    const {
      counts,loading, refetch
    } = useCountCollections(props.id);
    watch(() => props.id, id => {
      void refetch({ input: { id } });
    })
    return {
      counts,loading
    }
  }
})
</script>

<style scoped>

</style>
