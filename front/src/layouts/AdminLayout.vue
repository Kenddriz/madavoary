<template>
  <q-layout class="bg-primary" view="lHh lpr lFf">
    <q-header class="bordered-bottom">
      <q-toolbar>
        <q-avatar
          @click="$router.push('/')"
          class="cursor-pointer"
          size="80px" icon="home"
        />

        <q-toolbar-title>
          MENU PRINCIPAL
        </q-toolbar-title>

        <q-space />

        MADAVOARY
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
      <q-page-sticky
        v-if="$route.name != 'home'"
        position="bottom"
        :offset="[18, 18]"
      >
        <q-btn
          round
          icon="home"
          color="amber"
          @click="show()"
        />
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';
  import {useRouter} from 'vue-router';
  import {BottomSheet} from 'quasar';
  import {menu} from './data';

  export default defineComponent({
    name: 'admin-menu-bottom',
    setup() {
      const router = useRouter();
      return {
        show() {
          BottomSheet.create({
            dark: false,
            class: 'bg-primary text-white q-pa-md',
            message: 'Navigation rapide',
            grid: true,
            actions: menu.map(m => ({ label: m.to, to: m.to, icon: m.icon }))
          }).onOk((action: any) => {
            void router.push(`/${action.to}`);
          })
        }
      }
    }
  })
</script>

<style lang="scss" scoped>

</style>
