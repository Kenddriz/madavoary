<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bordered-bottom">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          {{$tm('dashboard.menu')[pathIndex]}}
        </q-toolbar-title>

        <div>Madavoary</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-primary"
    >
      <template v-if="user">
        <div class="row justify-center bordered-bottom q-py-sm">
          <q-avatar size="150px">
            <img :src="avatar()" />
          </q-avatar>
          <q-item-section class="col-12 text-center">
            <q-item-label>
              {{user.person.lastName}} {{user.person.firstName}}
            </q-item-label>
            <q-item-label class="text-white" caption>
              [{{$tm('roles')[user.role]}}]
            </q-item-label>
          </q-item-section>
        </div>
        <q-list>
          <q-item
            v-for="(item, index) in $tm('dashboard.menu')"
            :key="index"
            :to="`/${USER_HOME[user.role]}/${urls[index].to}`"
            exact
            active-class="text-amber"
          >
            <q-item-section side>
              <q-icon :name="urls[index].icon" />
            </q-item-section>
            <q-item-section>
              {{item}}
            </q-item-section>
          </q-item>
        </q-list>
      </template>
      <q-inner-loading :showing="loading">
        <q-spinner-dots size="80px" color="amber" />
      </q-inner-loading>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue'
import { useRoute } from 'vue-router';
import {useWHoAmI} from 'src/graphql/user/whoAmi';
import {USER_HOME} from 'src/graphql/user/session';
const urls = [
  { to: 'dashboard', icon: 'dashboard'},
  { to: 'users', icon: 'group'},
  { to: 'collections', icon: 'person'},
  { to: 'park', icon: 'person'},
  { to: 'my-account', icon: 'person'}
];
export default defineComponent({
  name: 'BackOfficeLayout',
  components: {},
  setup () {
    const route = useRoute();
    const pathIndex = computed(() => {
      const index = urls.findIndex(u => u.to === route.path.substr(route.path.lastIndexOf('/') + 1));
      return index >= 0 ? index : 0;
    });
    return {
      leftDrawerOpen: ref(false),
      pathIndex,
      urls,
      ...useWHoAmI(),
      USER_HOME
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
