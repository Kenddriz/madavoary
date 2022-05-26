<template>
  <q-layout view="lhh lpR fff">
    <q-header
      elevated
      class="bg-secondary"
      style="position: fixed"
    >
      <q-toolbar>
        <q-toolbar-title>
          Madavoary
        </q-toolbar-title>
        <q-space />
        <div class="cursor-pointer relative-position">
          <q-badge
            color="accent"
            floating
            class="absolute"
            style="z-index: 20; transform: translate(-20px, 0px)"
            :label="$tm('home.languages').find(l => l.value === lang).label"
          />
          <q-icon
            size="md"
            name="language"
          >
            <q-menu auto-close>
              <q-list class="bg-primary" separator>
                <q-item
                  v-for="(option, index) in $tm('home.languages')"
                  :key="index"
                >
                  <q-item-section>{{  }}
                    <q-radio
                      color="amber"
                      keep-color
                      v-model="lang"
                      :val="option.value"
                      :label="option.label"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-icon>
        </div>

      </q-toolbar>

      <q-toolbar>
        <div class="row flex flex-start q-pa-lg">
          <span
            v-for="(menu, index) in $tm('home.menuBar')"
            :key="index"
            class="q-mr-lg"
          >
            <a
                v-if="!menu.children.length && index !== 0"
                class="text-white row items-center text-subtitle1 no-text-decoration"
                :href="`${menu.to.charAt(0) === '/' ? '' : '#'}${menu.to}`"
              >
              <q-icon :name="menu.icon" color="white" size="sm" class="q-mr-sm" />
              {{ menu.label }}
            </a>
            <q-btn-dropdown :icon="menu.icon" v-else no-caps stretch flat :label="menu.label">
              <Areas />
            </q-btn-dropdown>
            <!--<q-btn-dropdown v-else no-caps stretch flat :label="menu.label">
              <div class="bg-primary">
                <a
                  v-for="(sub, i) in menu.children"
                  :key="i"
                  class="text-white row items-center q-pa-sm text-subtitle1 no-text-decoration"
                  :href="`${sub.to.charAt(0) === '/' ? '' : '#'}${sub.to}`"
                >
                  <q-icon :name="sub.icon" color="white" size="sm" class="q-mr-sm" />
                  {{ sub.label }}
                </a>
              </div>
            </q-btn-dropdown>-->
          </span>
        </div>
      </q-toolbar>
    </q-header>


    <q-page-container class="bg-primary">
      <q-page style="margin-bottom: 50px">
        <router-view />
      </q-page>
    </q-page-container>

    <q-footer class="bg-secondary">
      <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[10, 10]">
        <q-btn fab icon="keyboard_arrow_up" color="secondary" />
      </q-page-scroller>
      <Footer />
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import Footer from './Footer.vue';
  import { useLanguages } from './data/changeLanguage';
  import Areas from 'components/public/Area/ProtectedAreas.vue';

  interface Data {
    tab: number,
    open: boolean
  }

  export default defineComponent({
    name: 'MainLayout',
    components: { Footer, Areas },
    setup() {
      const data = reactive<Data>({
        tab: 0,
        open: false
      });
      return {
        data,
        ...useLanguages()
      }
    },
    /*mounted: function () {
      window.document.body.onscroll = () => {
        this.data.bg_header = window.scrollY > 100 ? 'bg-primary' : 'bg-transparent';
      }
    },*/
  });
</script>
<style lang="scss">
  a:active {
    color: $positive!important;
  }
  html {
    scroll-behavior: smooth;
  }
</style>
