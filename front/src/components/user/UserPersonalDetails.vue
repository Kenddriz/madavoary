<template>
  <q-card-section :horizontal="$q.screen.gt.sm">
    <q-avatar square size="150px">
      <q-img :src="getAvatar(user.avatar)">
        <div class="absolute-top-left bg-transparent flex flex-center">
          <q-badge
            style="border-radius: 50%;"
            :color="user.active ? 'positive' : 'warning'"
          />
        </div>
      </q-img>
    </q-avatar>
    <q-separator :vertical="$q.screen.gt.sm" />
    <q-list class="flex wrap">
      <q-item>
        <q-item-section>
          <q-item-label>
            {{user.firstName}}
            {{user.lastName}}
          </q-item-label>
          <q-item-label caption>
            {{$tm('roles')[user.role]}}, {{$tm('genders')[user.gender]}}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>{{$t('phoneNumber')}}</q-item-label>
          <q-item-label caption>{{user.phone}}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>{{$t('mailAddress')}}</q-item-label>
          <q-item-label class="break-line" caption>{{user.email}}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card-section>
  <slot v-if="$slots.default"></slot>
  <q-separator />

  <q-item class="row justify-between">
    <q-item-section>
      <q-item-label>{{$t('createdAt')}}</q-item-label>
      <q-item-label caption>
        {{formatDate(user.createdAt, $t('dateTime'))}}
      </q-item-label>
    </q-item-section>
    <q-item-section class="text-right">
      <q-item-label>{{$t('updatedAt')}}</q-item-label>
      <q-item-label caption>
        {{formatDate(user.updatedAt, $t('dateTime'))}}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {User} from 'src/graphql/types';
import {getAvatar} from 'src/graphql/user/whoAmi';
import {formatDate} from 'src/graphql/utils/utils';

export default defineComponent({
  name: 'UserPersonalDetails',
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    },
  },
  setup() {
    return {
      getAvatar,
      formatDate
    }
  }
})
</script>

<style scoped>

</style>
