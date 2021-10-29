<template>
  <ImageInput @upload="updateAvatar( $event[0], id)" :src="avatar" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ImageInput from 'components/shared/ImageInput.vue';
import {useUpdatePersonAvatar} from 'src/graphql/person/update.person';

export default defineComponent({
  name: 'UpdatePersonAvatar',
  components: { ImageInput },
  props: {
    avatar: String,
    id: Number,
  },
  setup() {
    return {
      ...useUpdatePersonAvatar()
    }
  }
});
</script>

<style scoped>

</style>
