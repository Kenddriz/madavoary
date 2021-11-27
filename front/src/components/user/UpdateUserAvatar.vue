<template>
  <ImageInput @upload="updateAvatar($event[0], id)" :src="avatar" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ImageInput from 'components/shared/ImageInput.vue';
import {useUpdateUserAvatar} from 'src/graphql/user/update.user.avatar';

export default defineComponent({
  name: 'UpdatePersonAvatar',
  components: { ImageInput },
  props: {
    avatar: String,
    id: Number,
  },
  setup() {
    return {
      ...useUpdateUserAvatar()
    }
  }
});
</script>

<style scoped>

</style>
