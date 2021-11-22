<template>
  <q-separator />
  <q-item class="row justify-between">
    <q-item-section>
      <q-item-label>{{$t('createdAt')}}</q-item-label>
      <q-item-label caption>
        {{formatDate(createdAt, $t('dateTime'))}}
      </q-item-label>
    </q-item-section>
    <q-item-section class="text-right">
      <q-item-label>{{$t('updatedAt')}}</q-item-label>
      <q-item-label caption>
        {{formatDate(updatedAt, $t('dateTime'))}}
      </q-item-label>
    </q-item-section>
  </q-item>
  <q-separator />
  <q-list dense>
    <q-item-label class="q-py-sm" header>{{$t('author')}}</q-item-label>
    <q-item>
      <q-item-section avatar>
        <q-avatar size="lg">
          <q-img :src="getAvatar(user.person.avatar)" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>
          {{user.person.lastName}}
          {{user.person.firstName}}
        </q-item-label>
        <q-item-label caption>{{$tm('roles')[user.role]}}</q-item-label>
      </q-item-section>
      <q-item-section side top>
        <q-btn
          @click="authorDetails"
          icon="read_more"
          round
          flat
          dense
          color="white"
        />
      </q-item-section>
    </q-item>
  </q-list>
  <q-separator />
  <q-card-actions align="between">
    <q-btn-group flat stretch>
      <q-btn
        @click="$emit('edit')"
        text-color="white"
        icon="edit"
      />
      <q-btn
        @click="$emit('delete')"
        text-color="white"
        icon="delete_forever"
      />
      <q-btn
        @click="$emit('info')"
        text-color="white"
        icon="more_vert"
      />
    </q-btn-group>
    <q-btn
      outline
      @click="$emit('back')"
      color="brown"
      text-color="white"
      icon="arrow_back"
    />
  </q-card-actions>
</template>

<script lang="ts">
import {defineAsyncComponent, defineComponent, PropType} from 'vue';
import {formatDate} from 'src/graphql/utils/utils';
import {User} from 'src/graphql/types';
import {useQuasar} from 'quasar';
import {getAvatar} from 'src/graphql/user/whoAmi';

export default defineComponent({
  name: 'CommonActionsDetails',
  props: {
    createdAt: String,
    updatedAt: String,
    user: {
      type: Object as PropType<User>,
      required: true
    }
  },
  emits: ['edit', 'delete', 'info', 'back'],
  setup(props) {
    const { dialog } = useQuasar();
    return {
      formatDate,
      authorDetails: () => dialog({
        component: defineAsyncComponent(() => import('components/user/update/EditUserParams.vue')),
        componentProps: { user: props.user }
      }),
      getAvatar
    }
  }
})
</script>

<style scoped>

</style>
