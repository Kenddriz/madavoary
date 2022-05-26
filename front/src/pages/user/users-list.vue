<template>
  <q-page>
    <div class="flex flex-center reverse-wrap justify-around q-gutter-y-md bordered-bottom q-pa-md">
      <q-card flat class="bg-primary">
        <q-card-section class="q-pb-none">
          Entrez un mot clé
        </q-card-section>
        <q-card-section>
          <q-card style="width: 18rem;" bordered flat class="bg-primary">
            <q-input class="col-12" input-class="q-px-md" dense borderless>
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </q-card>
        </q-card-section>
      </q-card>
      <q-card flat class="bg-primary">
        <q-card-section class="q-pb-none">
          Cochez les rôles d'utilisateurs
        </q-card-section>
        <q-card-section
          class="flex flex-center wrap q-gutter-md q-pa-md justify-between text-capitalize"
        >
          <q-checkbox
            v-for="(role, index) in $tm('user.roles')"
            :key="index"
            color="warning"
            :label="role"
          />
        </q-card-section>
      </q-card>
      <q-card flat class="bg-primary">
        <q-card-section class="q-pb-none">
          Cochez les status des comptes
        </q-card-section>
        <q-card-section
          class="flex flex-center wrap q-gutter-md q-pa-md justify-between text-capitalize"
        >
          <q-checkbox
            v-for="(status, index) in $tm('user.status')"
            :key="index"
            color="warning"
            :label="status"
          />
        </q-card-section>
      </q-card>
    </div>

    <div class="flex wrap wrap q-pa-lg">
      <q-card flat bordered class="bg-primary">
        <q-card-section>
          <q-img height="100px" src="/sign-in.svg" />
        </q-card-section>
        <q-card-section>
          <div class="text-h6">RANDRIAMANAJA Charlin</div>
          <div class="text-subtitle2">+261 34 18 536 53</div>
          <div class="text-subtitle2">rcarandrcharlin@gmail.com</div>
        </q-card-section>

        <q-card-actions align="between" class="q-pt-none">
          <q-btn flat icon="edit" />
          <q-btn flat icon="more_vert" />
          <q-btn flat icon="delete" />
        </q-card-actions>
      </q-card>
    </div>

    <q-page-sticky
      style="width: 100vw;"
      class="bordered-top q-pt-md"
      position="bottom"
      :offset="[0, 18]"
    >
      <q-pagination
        :model-value="1"
        :max="10"
        :max-pages="6"
        boundary-numbers
        color="orange"
      />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
    import {defineComponent} from 'vue';

    export default defineComponent({
        name: 'users-list',
      setup() {
          return {

          }
      }
    })
</script>

<style lang="scss" scoped>
</style>
