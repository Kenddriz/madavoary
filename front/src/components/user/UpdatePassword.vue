<template>
  <q-btn @click="dialog = true" size="md" icon="edit" round dense flat />
  <q-dialog v-model="dialog">
    <MovableCard>
      <template v-slot:title>
        {{$t('loading.update').replace('...', '')}}
      </template>
      <q-form @submit.prevent="submitUpdate" class="q-gutter-y-md q-pa-md">
        <PasswordInput
          outlined
          :model-value="input.currentPassword"
          v-model="input.currentPassword"
          label="Mot de passe actuel"
        />
        <PasswordInput
          outlined
          :model-value="input.newPassword"
          v-model="input.newPassword"
          label="Nouveau mot de passe"
        />
        <q-btn
          outline
          type="submit"
          color="white"
          icon="save"
          :label="$t('validate')"
          no-caps
          class="full-width"
        />
      </q-form>
    </MovableCard>
  </q-dialog>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import PasswordInput from './PasswordInput.vue';
import {useUpdatePassword} from 'src/graphql/user/update-password';
import MovableCard from 'components/shared/MovableCard.vue';

export default defineComponent({
  name: 'UpdatePassword',
  components: { PasswordInput, MovableCard },
  setup() {
    return {
      ...useUpdatePassword(),
      types: [true, true]
    }
  }
});
</script>

<style scoped>

</style>
