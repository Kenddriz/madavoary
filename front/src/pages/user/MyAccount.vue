<template>
  <q-page class="bg-dark q-pa-sm">
    <template v-if="user">
      <q-card bordered flat>
        <q-card-section class="text-h5 text-center">
          Détails personnels
        </q-card-section>
        <q-separator />
        <q-card-section :horizontal="$q.screen.gt.sm">
          <UpdatePersonAvatar
            height="200px"
            :id="user.person.id" :src="avatar()"
            class="col-sm-12 col-md-3"
          />
          <q-separator :vertical="$q.screen.gt.sm" />
          <div class="row wrap justify-between items-center col q-gutter-x-md">
            <q-item v-for="(item, index) in basicInfos" :key="index">
              <q-item-section>
                <q-item-label>{{$t(item)}}</q-item-label>
                <q-item-label v-if="item === 'role'" caption>
                  {{$tm('roles')[user[item]]}}
                </q-item-label>
                <q-item-label v-else-if="item === 'gender'" caption>
                  {{$tm('genders')[user.person[item]]}}
                </q-item-label>
                <q-item-label v-else>
                  {{user.person[item]}}
                </q-item-label>
              </q-item-section>
            </q-item>
            <UserUpdateBtn
              class="q-mx-xl"
              rounded
              no-caps
              outline
              text-color="white"
              style="width: calc(100% - 50px)"
              label="Mettre à jour"
              icon-right="edit"
              :user="user"
            />
          </div>
        </q-card-section>
      </q-card>
      <q-card bordered flat class="q-my-sm">
        <q-card-section horizontal class="q-py-md items-center">
          <q-list class="col">
            <q-item>
              <q-item-section>
                <q-item-label>{{$t('createdAt')}}</q-item-label>
                <q-item-label caption>
                  {{formatDate(user.person.createdAt, $t('dateTime'))}}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>{{$t('updatedAt')}}</q-item-label>
                <q-item-label caption>
                  {{formatDate(user.person.updatedAt, $t('dateTime'))}}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-separator :vertical="$q.screen.gt.sm" />
          <p class="text-h5 text-center col">
            Sécurité<UpdatePassword />
          </p>
        </q-card-section>
      </q-card>

      <q-card v-ripple flat bordered class="q-py-md text-center cursor-pointer">
        Mes decouvertes
      </q-card>
    </template>
    <q-inner-loading :showing="loading">
      <q-spinner-ball color="warning" size="100px" />
    </q-inner-loading>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {useWHoAmI} from 'src/graphql/user/whoAmi';
import {formatDate} from 'src/graphql/utils/utils';
import UserUpdateBtn from 'components/user/update/UserUpdateBtn.vue';
import UpdatePersonAvatar from 'components/person/UpdatePersonAvatar.vue';
import UpdatePassword from 'components/user/UpdatePassword.vue';

const basicInfos = ['id', 'role', 'lastName', 'firstName', 'gender', 'email', 'phone'];
export default defineComponent({
  name: 'MyAccount',
  components: { UserUpdateBtn, UpdatePersonAvatar, UpdatePassword },
  setup() {
    return {
      formatDate,
      confirmPwd: ref<string>(''),
      basicInfos,
      ...useWHoAmI()
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
