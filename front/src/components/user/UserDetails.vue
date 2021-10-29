<template>
  <q-card flat bordered>

    <UserPersonalDetails :user="user" />

    <q-separator />

    <q-card-section>
      <p class="text-h6 q-mb-sm">Analitiques</p>
      <CountUserCollections :id="user.id" />
    </q-card-section>

    <q-separator />

    <q-card-section class="q-pa-xs text-right">
      Aucune decouverte
    </q-card-section>

    <q-separator />

    <q-card-actions align="between">
      <q-btn
        outline
        color="brown"
        text-color="white"
        icon="edit"
        @click="updateParams"
      />
      <q-btn outline color="brown" text-color="white" icon="delete_forever"/>
      <q-btn outline color="brown" text-color="white" icon="explore" />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import UserPersonalDetails from 'components/user/UserPersonalDetails.vue';
import {User} from 'src/graphql/types';
import EditUserParams from 'components/user/update/EditUserParams.vue';
import {useQuasar} from 'quasar';
import CountUserCollections from 'components/collection/CountCollections.vue';

export default defineComponent({
  name: 'UserDetails',
  components: { CountUserCollections, UserPersonalDetails },
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    },
  },
  setup(props) {
    const { dialog } = useQuasar();
    return {
      updateParams: () => dialog({
        component: EditUserParams,
        componentProps: { user: props.user }
      })
    }
  }
})
</script>

<style scoped>

</style>
