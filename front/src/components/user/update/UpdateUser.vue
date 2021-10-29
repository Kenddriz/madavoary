<template>
  <q-dialog ref="dialogRef">
    <MovableCard>
      <template v-slot:title>
        Modification des détails personnels
      </template>
      <q-form
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        @submit="submitUpdate"
        class="q-gutter-y-md q-pa-md"
      >
        <q-input
          rounded
          outlined
          label-color="white"
          dense
          label="Nom"
          :model-value="input.lastName"
          v-model="input.lastName"
          :lazy-rules="true"
          :rules="[v => v && v.length||'Champs requis']"
          hide-bottom-space
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
        <q-input
          rounded
          outlined
          label-color="white"
          dense
          label="Prénom"
          :model-value="input.firstName"
          v-model="input.firstName"
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
        <UserSelect v-model="input.gender" />
        <PhoneInput v-model="input.phone" />
        <q-btn
          v-close-popup
          rounded
          class="full-width"
          type="submit"
          no-caps
          color="primary"
          :label="$t('validate')"
        />
      </q-form>
    </MovableCard>
  </q-dialog>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import MovableCard from '../../shared/MovableCard.vue';
import {useUpdateUser} from 'src/graphql/user/update.user';
import {User} from 'src/graphql/types';
import UserSelect from 'components/shared/UserSelect.vue';
import PhoneInput from 'components/shared/PhoneInput.vue';
import {useDialogPluginComponent} from 'quasar';

export default defineComponent({
  name: 'UpdateUserInfos',
  components: { MovableCard, UserSelect, PhoneInput },
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    }
  },
  setup(props) {
    const { dialogRef } = useDialogPluginComponent();
    return {
      ...useUpdateUser(props.user),
      dialogRef
    }
  }
})
</script>

<style scoped>

</style>
