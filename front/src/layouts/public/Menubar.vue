<template>
    <q-toolbar>
    <q-toolbar-title>
        RC
    </q-toolbar-title>
      <!--<q-btn-toggle
        v-model="$i18n.locale"
        flat
        toggle-text-color="positive"
        dense
        :options="$tm('languages')"
        @input="value => onLanguageChange(value)"
      /> -->
</q-toolbar>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
    name: 'Menubar',
  props: {
      openDrawer: Function
  },
    setup(){
        return {
        };
    }
});
</script>
