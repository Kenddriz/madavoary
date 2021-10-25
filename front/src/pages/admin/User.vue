<template>
  <q-page class="bg-dark row">
    <div class="col-md-6 col-sm-12 q-pa-sm">
      <UsersTable />
    </div>
    <div class="col-md-6 col-sm-12 q-pa-sm">
      <UserDetails />
    </div>
  </q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import UsersTable from 'components/user/UsersTable.vue';
import UserDetails from 'components/user/UserDetails.vue';

export default defineComponent({
  name: 'User',
  components: { UsersTable, UserDetails },
  setup() {
    return {

    }
  }
})
</script>

<style scoped>

</style>
