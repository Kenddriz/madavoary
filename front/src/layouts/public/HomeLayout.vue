<template>
  <q-layout view="hHh lpR fff">

    <q-header class="bg-primary text-white" reveal>
      <q-toolbar>
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
            v-for="(m, index) of menuBar.slice(0, 4)"
            :key="index"
          >
            <q-route-tab
              v-if="index !== 1"
              :to="m.to"
              :name="m"
              :label="$t(m.label)"
              :icon="m.icon"
            />
            <q-btn-dropdown
              :icon="m.icon"
              v-else
              no-caps
              stretch
              flat
              :label="$t(m.label)"
              :model-value="false"
            >
              <Areas :areas="areas" />
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
  import Areas from 'components/area/Areas.vue';
  import {useAreas} from 'src/graphql/area/areas';
  import {menuBar} from 'layouts/public/data/data';
  export default defineComponent({
    components: { Footer, Areas },
    setup() {
      return {
        left: ref(false),
        menuBar,
        ...useAreas(),
      }
    }
  })
</script>
