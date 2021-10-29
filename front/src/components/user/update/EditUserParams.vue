<template>
  <q-dialog ref="dialogRef">
    <MovableCard resizable style="width: 400px;">
      <template v-slot:title>
        {{$t('loading.update').replace('...', '')}}
      </template>
      <UserPersonalDetails :user="user">
        <q-separator />
        <q-item>
          <q-item-section>
            <q-item-label>{{$tm('role')}}</q-item-label>
            <q-item-label class="text-amber" caption>
              {{$tm('roles')[user.role]}}
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{$t('status')}}</q-item-label>
            <q-item-label caption>
              <q-toggle
                :color="input.active ? 'positive' : 'warning'"
                :model-value="user.active"
                v-model="input.active"
                :label="$t(input.active ? 'enabled' : 'disabled')"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
      </UserPersonalDetails>

      <template v-slot:footer>
        <q-btn
          class="full-width"
          unelevated
          flat
          label="Enregistrer"
          icon="save"
          @click="submitUpdate"
          no-caps
          v-close-popup
        />
      </template>
    </MovableCard>
  </q-dialog>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {User} from 'src/graphql/types';
import MovableCard from 'components/shared/MovableCard.vue';
import UserPersonalDetails from 'components/user/UserPersonalDetails.vue';
import {useDialogPluginComponent} from 'quasar';
import {useUpdateUser} from 'src/graphql/user/update.user';

export default defineComponent({
  name: 'EditUserParams',
  components: { MovableCard, UserPersonalDetails},
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    }
  },
  setup(props) {
    const { dialogRef } = useDialogPluginComponent();
    return {
      dialogRef,
      ...useUpdateUser(props.user),
    }
  }
})
</script>

<style scoped>

</style>
