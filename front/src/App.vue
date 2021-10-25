<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import {useQuasar} from 'quasar';

export default defineComponent({
  name: 'App',
  setup() {
    const { dark } = useQuasar();
    dark.set(true);
    return {}
  }
})
</script>

<style lang="scss">
::-webkit-scrollbar {
  height: 4px;
  width: 5px;
}
::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: -webkit-gradient(linear, left top, left bottom, from($primary), to(white));
  box-shadow: inset 2px 2px 2px rgba(255, 255, 255, 0.25), inset -2px -2px -2px rgba(0, 0, 0, 0.25);
}
body {
  font-family: Poppins, sans-serif !important;
  font-size: 0.9rem;
}
.sticky-header-table {
  .q-table__top, .q-table__bottom, thead tr:first-child th {
    background-color: white;
  }
  thead tr th {
    position: sticky;
    z-index: 1
  }
  thead tr:first-child th {
    top: 0
  }
  &.q-table--loading thead tr:last-child th {
    /* height of all previous header rows */
    top: 48px
  }
}
</style>
