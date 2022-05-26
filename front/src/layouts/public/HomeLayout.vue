<template>
  <q-layout view="hHh lpR fff">

    <q-header class="bg-primary text-white" reveal>
      <q-toolbar>
        <!--<q-btn
          @click="left = !left"
          dense
          flat
          round
          icon="menu"
        />-->

        <q-toolbar-title>
          <q-avatar>
            <img src="travelers.svg">
          </q-avatar>
        </q-toolbar-title>

        <q-tabs
          no-caps
          :breakpoint="375"
          inline-label
          indicator-color="orange"
          align="justify"
          content-class="q-mt-sm"
        >
          <template
            v-for="(m, index) of $tm('home.menuBar').slice(0, 4)"
            :key="index"
          >
            <q-route-tab
              v-if="index !== 1"
              :to="m.to"
              :name="m"
              :label="m.label"
              :icon="m.icon"
              exact
            />
            <q-btn-dropdown
              :icon="menu.icon"
              v-else
              no-caps
              stretch
              flat
              :label="m.label"
              :model-value="false"
            >
              <Areas />
            </q-btn-dropdown>
          </template>
        </q-tabs>
        <q-space />
        <q-icon
          size="md"
          name="language"
          color="amber"
        />
      </q-toolbar>
    </q-header>

    <q-drawer :model-value="left" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <Footer />

  </q-layout>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import Footer from 'layouts/public/Footer.vue';
  import Areas from 'components/public/Area/ProtectedAreas.vue';
  export default defineComponent({
    components: { Footer, Areas },
    setup() {
      return {
        left: ref(false),
        menu: ['Accueil', 'Parcs', 'Etres vivants', 'Aventures']
      }
    }
  })
</script>
