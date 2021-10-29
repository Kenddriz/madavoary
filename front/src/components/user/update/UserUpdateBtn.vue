<template>
  <q-btn @click="show"  />
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {useQuasar} from 'quasar';
import UpdateUser from 'components/user/update/UpdateUser.vue';
import {User} from 'src/graphql/types';

export default defineComponent({
  name: 'UserUpdateBtn',
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    }
  },
  setup(props) {
    const {dialog} = useQuasar()
    return {
      show: () => dialog({
        component: UpdateUser,
        componentProps: { user: props.user }
      })
    }
  }
})
</script>

<style scoped>

</style>
